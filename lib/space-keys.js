'use babel'

import spaceKeysView from './space-keys-view'
import { CompositeDisposable } from 'atom'
import { readFileSync } from 'season'

export default {
  spaceKeysView: null,
  modalPanel: null,
  subscriptions: null,

  activate (state) {
    this.spaceKeysView = new spaceKeysView(state.spaceKeysViewState)
    this.modalPanel = atom.workspace.addBottomPanel({
      item: this.spaceKeysView.getElement(),
      visible: false
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    return this.subscriptions.add(atom.commands.add('atom-workspace', {
      'space-keys:toggle': () => this.toggle() }))
  },

  deactivate () {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.spaceKeysView.destroy()
  },

  remove () {
    this.modalPanel.hide()
    this.spaceKeysView.removeChildren()
    this.spaceKeysView.keyState = null
    atom.workspace.getActivePane().activate()
  },

  toggle () {
    if (this.modalPanel.isVisible()) {
      this.remove()
    } else {
      this.spaceKeysView.arrange(this.spaceKeysView.conf)
      this.modalPanel.show()
      this.spaceKeysView.element.focus()
      this.spaceKeysView.keyListen()
    }
  }
}
