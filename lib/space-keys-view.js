'use babel'

import fs from 'fs-extra'
import path from 'path'
import { readFileSync } from 'season'
import spaceKeys from './space-keys'

export default class spaceKeysView {
  constructor (serializedState) {
    // Create root element
    this.element = document.createElement('div')
    this.element.classList.add('space-keys')
    this.element.classList.add('block-group')
    this.element.tabIndex = 1

    this.element.addEventListener('focusout', outfocus => { spaceKeys.remove() })
    this.keyHandler = this.keyListener.bind(this)

    this.keyState = null

    // 1. Make sure that path exsits
    // 2. If not, copy out space-keys.cson from templates
    // 3. Inform user of the change
    const confFile = `${atom.getConfigDirPath()}/space-keys.cson`

    try {
      fs.accessSync(confFile)
    } catch (ex) {
      fs.copySync(path.resolve(__dirname, '..', 'templates', 'space-keys.cson'), confFile, {clobber: true})
      atom.notifications.addSuccess(`Copied the default Space Keys configuration to ${confFile}`)
    }

    this.conf = readFileSync(confFile)

    atom.config.observe('editor.fontSize', this.fontSizeFromConfig.bind(this))
    atom.config.observe('editor.fontFamily', this.fontFamilyFromConfig.bind(this))
  }

  fontSizeFromConfig(size) {
    this.element.style.fontSize = size + 'px'
  }

  fontFamilyFromConfig(family) {
    this.element.style.fontFamily = family
  }

  // Draw the currently valid window
  arrange (keys) {
    for (var k in keys) {
      var divKey = document.createElement('div')
      divKey.textContent = `[${k}]  ➡  ${keys[k].name}`
      divKey.classList.add('base-background-color')
      divKey.classList.add('main')
      divKey.classList.add('block')
      this.element.appendChild(divKey)
    }
  }

  removeChildren () {
    var arrayChildren = Array.from(this.element.childNodes)
    for (let child of arrayChildren) { child.remove() }
  }

  keyListener (keypress) {
    var charKey = String.fromCharCode(keypress.charCode)

    // We need to turn ' ' into 'space' string if necessary
    if (charKey === ' ') { charKey = 'space' }

    // Initialize keyState to root if it's null.
    if (this.keyState === null) {
      this.keyState = this.conf[charKey]
    } else {
      this.keyState = this.keyState[charKey]
    }

    // Remove everything if we have no definition. Else, execute the command
    // or move down the object.
    if (this.keyState === undefined) {
      spaceKeys.remove()
    } else {
      // Go through the subkeys
      if (this.keyState['subkeys'] !== undefined) {
        this.keyState = this.keyState['subkeys']
        this.removeChildren()
        this.arrange(this.keyState)
      }

      // Go through the command
      if (this.keyState['command'] !== undefined) {
        let atomCommand = this.keyState['command']
        spaceKeys.remove()
        atom.commands.dispatch(document.querySelector('atom-text-editor'), atomCommand)
      }

      // If we cannot find a valid entry, remove
      if (this.keyState === null) {
        spaceKeys.remove()
      }
    }
  }

  keyListen () {
    this.element.addEventListener('keypress', this.keyHandler)
  }

  // Tear down any state and detach
  destroy () {
    return this.element.remove()
  }

  getElement () {
    return this.element
  }
}
