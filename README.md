# Space-Keys

Love Atom? Miss the mnemonic type mapping brought to you by Spacemacs? The
answer is Space-Keys! Toggle Space-Keys to pull up a menu of commands.

# Configuring Shortcuts

While Space-Keys will copy a basic template configuration you can use, it is
likely you will want to completely replace it or add commands that suit your
needs. The default configuration assumes you have no external packages, which
is likely wrong. The basic configuration is easy and is written in CSON. The
example configuration, which is the template that also ships with Space-Keys
is given below:

    a:
      name: 'Application'
      subkeys:
        a:
          name: 'About'
          command: 'application:about'
        p:
          name: 'Add Project Folder'
          command: 'application:add-project-folder'
    c:
      name: 'Configuration'
      subkeys:
        c:
          name: 'Open Config'
          command: 'application:open-your-config'
        i:
          name: 'Open Init Script'
          command: 'application:open-your-init-script'
        k:
          name: 'Open Keymap'
          command: 'application:open-your-keymap'
        n:
          name: 'Open Snippets'
          command: 'application:open-your-snippets'
        p:
          name: 'Show Preferences'
          command: 'application:show-preferences'
        s:
          name: 'Show Settings'
          command: 'application:show-settings'
        t:
          name: 'Open Stylesheet'
          command: 'application:open-your-stylesheet'
    f:
      name: 'Files'
      subkeys:
        l:
          name: 'Open Folder'
          command: 'application:open-folder'
        n:
          name: 'New File'
          command: 'application:new-file'
        o:
          name: 'Open File'
          command: 'application:open-file'
        s:
          name: 'Save File'
          command: 'core:save'
        v:
          name: 'Save File As'
          command: 'core:save-as'
        A:
          name: 'Save All'
          command:'window:save-all'
    p:
      name: 'Panes'
      subkeys:
        c:
          name: 'Close Pane'
          command: 'pane:close'
        l:
          name: 'Move Item Left'
          command: 'pane:move-item-left'
        r:
          name: 'Move Item Right'
          command: 'pane:move-item-right'
        s:
          name: 'Save Items'
          command: 'pane:save-items'
        t:
          name: 'Active Item to Top'
          command: 'pane:move-item-to-top-of-stack'
        u:
          name: 'Reopen Closed Item'
          command: 'pane:reopen-closed-item'
        x:
          name: 'Close Other Pane Items'
          command: 'pane:close-other-items'
        '-':
          name: 'Decrease Pane Size'
          command: 'pane:decrease-size'
        '+':
          name: 'Increase Pane Size'
          command: 'pane:increase-size'
        space:
          name: 'Pane Splits'
          subkeys:
            d:
              name: 'Split down'
              command: 'pane:split-down'
            l:
              name: 'Split left'
              command: 'pane:split-left'
            r:
              name: 'Split right'
              command: 'pane:split-right'
            u:
              name: 'Split up'
              command: 'pane:split-up'
    r:
      name: 'Projects'
      subkeys:
        f:
          name: 'Show Project Find'
          command: 'project-find:show'
        t:
          name: 'Toggle Project Find'
          command: 'project-find:toggle'
    s:
      name: 'Settings View'
      subkeys:
        i:
          name: 'Install Packages and Themes'
          command: 'settings-view:install-packages-and-themes'
        t:
          name: 'Change Themes'
          command: 'settings-view:change-themes'
        u:
          name: 'Check for updates'
          command: 'settings-view:check-for-package-updates'
    t:
      name: 'Tabs'
      subkeys:
        A:
          name: 'Close All Tabs'
          command: 'tabs:close-all-tabs'
        c:
          name: 'Close Tab'
          command: 'tabs:close-tab'
        O:
          name: 'Close Other Tabs'
          command: 'tabs:close-other-tabs'
        s:
          name:  'Close Saved Tabs'
          command: 'tabs:close-saved-tabs'

As we can see, we start with a keyboard key we want to associate. Then we
define a 'name' and either a *command* associated with the key, or *subkeys*
which can then have their own keys associated with it. So, for example,
invoking Space-Keys and then pressing t, followed by s will invoke
*tabs:close-saved-tabs* command.

# Why is it called Space-Keys?

Mostly because of its association with SpaceMacs, although this package is
a bit different in that it does not replace the key bindings already present
in Atom; it's just another way to bind your keys when we come right down to it.

You can use whatever keybinding you want for Space-Keys toggle, of course,
certainly not just space.

# Similar Projects

Most similar is [Proton / Space-Atom](https://github.com/dvcrn/proton).
However, Proton is a much more ambitious project written in Clojure which aims
to reproduce the SpaceMacs layer-based configuration. I am just interested in
getting the key bindings working. In addition, I don't think Proton is built to
completely change the keybindings around.


