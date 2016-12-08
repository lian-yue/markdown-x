hello world
<http://example.com>



AT&T has an ampersand in their name.

AT&amp;T is another way to write it.

This & that.

4 < 5.

6 > 5.

Here's a [link] [1] with an ampersand in the URL.

Here's a link with an amersand in the link text: [AT&T] [2].

Here's an inline [link](/script?foo=1&bar=2).

Here's an inline [link](</script?foo=1&bar=2>).


[1]: http://example.com/?foo=1&bar=2
[2]: http://att.com/  "AT&T"









## foo

1. bar:

    > - one
        - two
            - three
            - four
            - five

1. foo:

    ```
    line 1
    line 2
    ```

1. foo:

    1. foo `bar` bar:

        ``` erb
        some code here
        ```

    2. foo `bar` bar:

        ``` erb
        foo
        ---
        bar
        ---
        foo
        bar
        ```

    3. foo `bar` bar:

        ``` html
        ---
        foo
        foo
        ---
        bar
        ```

    4. foo `bar` bar:

            foo
            ---
            bar

    5. foo







\[test](not a link)









先说一个我的：
去年公司准备做个网站，正好看到一个域名正在出售，
标价格很高，发邮件询问能否便宜一点，告知不能。

过了一周这样，准备付款购买了，哪知报价涨了近一倍...
老总比较生气，让寻找简拼域名替代。

正好一个简略的三拼域名不续费掉了，在国外抢注商那抢注回来了。
然后就用这个简拼域名做了网站。

哪知过了近三个月那个域名贩子将那个域名自己做了跟我们名字一样的网站，一模一样...
名字一样，内容也跟我们网站一模一样。

你说这样无耻不无耻，现在要过年了，域名用了隐私保护，老总说明年回来找证据告死他。






Foo [bar][].

Foo [bar](/url/ "Title with "quotes" inside").


[bar]: /url/ "Title with "quotes" inside"








# nginx-dpkg-build

This script simplifies making custom builds of [NGINX](https://nginx.org/en/) web server for Debian and Ubuntu systems. Earlier versions were published [here](https://gist.github.com/a-rodin/8406815dd05f39f10418).

The key features:
* Support for custom patches, configs, build flags, and arbitrary files in the target filesystem.
* Using of `dpkg-buildpackage`. The packages are built using the same procedure as the ones in the official repositories and based on the versions from the official repositories.
* Custom suffixes for package names allow the built packages to not be replaced by non-patched versions on system upgrade.
* Building for any Ubuntu and Debian version by running build environments in Docker containers.

## Dependencies

To run the script you should have either:
* Bash and Docker on any POSIX-compatible system;
* or Ubuntu/Debian system, same as the target one, with build dependencies installed by

   ```bash
   sudo apt-get build-dep -y nginx
   sudo apt-get install -y ccache
   ```
  Although the `ccache` requirement is not mandatory, it significantly speeds up subsequent rebuilds.

## Basic Usage

The basic usage is following:

```bash
./nginx-dpkg-build.sh -s mysuffix -d ubuntu:16.04
```
It rebuilds NGINX packages for Ubuntu 16.04, but the names of build packages look like `nginx-mysuffix` and `nginx-mysuffix-common` instead of generic `nginx` and `nginx-common`.

The build runs in a Docker container from the official Ubuntu image, the output files are located by default in `nginx-mysuffix_ubuntu_16.04` in the current subdirectory.

Alternatively, if you don't want to use Docker, you could specify `-z` flag instead of `-d`:

```
./nginx-dpkg-build.sh -s mysuffix -z
```
## Options

| Flag | Description | Example |
|------|-------------|----------|
| `-s <suffix>` | specify suffix added to the resulting packages (required) | `-s mysuffix` |
| `-d <dist>` | specify target distribution as a docker tag ([ubuntu](https://hub.docker.com/_/ubuntu/), [debian](https://hub.docker.com/_/debian/)) |  `-d debian:jessie` |
| `-z` | build on the host system without docker | |
| `-b <dir>` | specify build directory (default is `nginx-{suffix}_{dist}` | `-b ./build-dir` |
| `-p <patch>` | add patch to the source tree | `-p ./patch1.patch` |
| `-r <dir>` | copy files from the directory to the package's root dir | `-r ./root-dir` |
| `-o <flag>` | pass option to the configure script | `-o '--with-libatomic'` |
| `-c <config>` | add config file or directory for installation to /etc/nginx  | `-c nginx.conf` |
| `-m <module>` | add module's directory to compile it into nginx | `-m ./ngx_postgres/` |
| `-a <package>` | add dependency to the compiled package | `-a 'libatomic1 (>=4.9)'` |
| `-u <package>` | add build dependency | `-u libatomic-ops-dev` |
| `-k <dir>` | directory for ccache  | `-k $HOME/.ccache` |
| `-i <name>` | maintainer's name and email for package changelog | `-i 'Name <name@domain.com>'` |
| `-n` | don't run dpkg-buildpackage | |
| `-h` | show help | |

## Examples

### Adding PostgreSQL module
```bash
git clone https://github.com/FRiCKLE/ngx_postgres.git
./nginx-dpkg-build.sh -s postgres -d debian:jessie \
    -a postgresql-common -u postgresql-server-dev-all -m ngx_postgres
```

### Adding libatomic support
```bash
./nginx-dpkg-build.sh -s atomic -d ubuntu:14.04 \
    -a libatomic1 -u 'libatomic-ops-dev (>=7.3)' -o '--with-libatomic'
```

### Publishing packages to PPA
This example assumes that you have a [launchpad](https://launchpad.net/) account and created a PPA repository.

You could build package as described previously, but should specify your name and email to be included to
the package:

```bash
./nginx-dpkg-build.sh -s mysuffix -i 'My Name <my@email.com>' -d ubuntu:16.04
```

Then you could navigate to the build directory `nginx-mysuffix_ubuntu_16.04` and upload the changes to PPA
as described in the [upload instructions](https://help.launchpad.net/Packaging/PPA/Uploading). Note that you need to
have your GPG public key uploaded to launchpad in order to upload packages to PPA.


## 5.20.2 (2016-10-21)

### Bug fixes

Fix `CodeMirror.version` returning the wrong version number.

## 5.20.0 (2016-10-20)

### Bug fixes

Make `newlineAndIndent` command work with multiple cursors on the same line.

Make sure keypress events for backspace are ignored.

Tokens styled with overlays no longer get a nonsense `cm-cm-overlay` class.

Line endings for pasted content are now normalized to the editor's [preferred ending](http://codemirror.net/doc/manual.html#option_lineSeparator).

[javascript mode](http://codemirror.net/mode/javascript): Improve support for class expressions. Support TypeScript optional class properties, the `abstract` keyword, and return type declarations for arrow functions.

[css mode](http://codemirror.net/mode/css): Fix highlighting of mixed-case keywords.

[closebrackets addon](http://codemirror.net/doc/manual.html#addon_closebrackets): Improve behavior when typing a quote before a string.

### New features


The core is now maintained as a number of small files, using ES6 syntax and modules, under the `src/` directory. A git checkout no longer contains a working `codemirror.js` until you `npm build` (but when installing from NPM, it is included).

The [`refresh`](http://codemirror.net/doc/manual.html#event_refresh) event is now documented and stable.

## 5.19.0 (2016-09-20)

### Bugfixes

[erlang mode](http://codemirror.net/mode/erlang): Fix mode crash when trying to read an empty context.

[comment addon](http://codemirror.net/doc/manual.html#addon_comment): Fix broken behavior when toggling comments inside a comment.

xml-fold addon: Fix a null-dereference bug.

Page up and page down now do something even in single-line documents.

Fix an issue where the cursor position could be off in really long (~8000 character) tokens.

### New features

[javascript mode](http://codemirror.net/mode/javascript): Better indentation when semicolons are missing. Better support for TypeScript classes, optional parameters, and the `type` keyword.

The [`blur`](http://codemirror.net/doc/manual.html#event_blur) and [`focus`](http://codemirror.net/doc/manual.html#event_focus) events now pass the DOM event to their handlers.

## 5.18.2 (2016-08-23)

### Bugfixes

[vue mode](http://codemirror.net/mode/vue): Fix outdated references to renamed Pug mode dependency.

## 5.18.0 (2016-08-22)

### Bugfixes

Make sure [gutter backgrounds](http://codemirror.net/doc/manual.html#addLineClass) stick to the rest of the gutter during horizontal scrolling.

The contenteditable [`inputStyle`](http://codemirror.net/doc/manual.html#option_inputStyle) now properly supports pasting on pre-Edge IE versions.

[javascript mode](http://codemirror.net/mode/javascript): Fix some small parsing bugs and improve TypeScript support.

[matchbrackets addon](http://codemirror.net/doc/manual.html#addon_matchbrackets): Fix bug where active highlighting was left in editor when the addon was disabled.

[match-highlighter addon](http://codemirror.net/doc/manual.html#addon_match-highlighter): Only start highlighting things when the editor gains focus.

[javascript-hint addon](http://codemirror.net/doc/manual.html#addon_javascript-hint): Also complete non-enumerable properties.

### New features

The [`addOverlay`](http://codemirror.net/doc/manual.html#addOverlay) method now supports a `priority` option to control the order in which overlays are applied.

MIME types that end in `+json` now default to the JSON mode when the MIME itself is not defined.

### Breaking changes

The mode formerly known as Jade was renamed to [Pug](http://codemirror.net/mode/pug).

The [Python mode](http://codemirror.net/mode/python) now defaults to Python 3 (rather than 2) syntax.

## 5.17.0 (2016-07-19)

### Bugfixes

Fix problem with wrapped trailing whitespace displaying incorrectly.

Prevent IME dialog from overlapping typed content in Chrome.

Improve measuring of characters near a line wrap.

[javascript mode](http://codemirror.net/mode/javascript): Improve support for `async`, allow trailing commas in `import` lists.

[vim bindings](http://codemirror.net/demo/vim.html): Fix backspace in replace mode.

[sublime bindings](http://codemirror.net/demo/sublime.html): Fix some key bindings on OS X to match Sublime Text.

### New features

[markdown mode](http://codemirror.net/mode/markdown): Add more classes to image links in highlight-formatting mode.

## 5.16.0 (2016-06-20)

### Bugfixes

Fix glitches when dragging content caused by the drop indicator receiving mouse events.

Make Control-drag work on Firefox.

Make clicking or selection-dragging at the end of a wrapped line select the right position.

[show-hint addon](http://codemirror.net/doc/manual.html#addon_show-hint): Prevent widget scrollbar from hiding part of the hint text.

[rulers addon](http://codemirror.net/doc/manual.html#addon_rulers): Prevent rulers from forcing a horizontal editor scrollbar.

### New features

[search addon](http://codemirror.net/doc/manual.html#addon_search): Automatically bind search-related keys in persistent dialog.

[sublime keymap](http://codemirror.net/demo/sublime.html): Add a multi-cursor aware smart backspace binding.

## 5.15.2 (2016-05-20)

### Bugfixes

Fix a critical document corruption bug that occurs when a document is gradually grown.

## 5.15.0 (2016-05-20)

### Bugfixes

Fix bug that caused the selection to reset when focusing the editor in contentEditable input mode.

Fix issue where not all ASCII control characters were being replaced by placeholders.

Remove the assumption that all modes have a `startState` method from several wrapping modes.

Fix issue where the editor would complain about overlapping collapsed ranges when there weren't any.

Optimize document tree building when loading or pasting huge chunks of content.

[markdown mode](http://codemirror.net/mode/markdown/): Fix several issues in matching link targets.

[clike mode](http://codemirror.net/mode/clike/): Improve indentation of C++ template declarations.

### New features

Explicitly bind Ctrl-O on OS X to make that binding (“open line”) act as expected.

Pasting [linewise-copied](http://codemirror.net/doc/manual.html#option_lineWiseCopyCut) content when there is no selection now inserts the lines above the current line.

[javascript mode](http://codemirror.net/mode/javascript/): Support `async`/`await` and improve support for TypeScript type syntax.

## 5.14.2 (2016-04-20)

### Bugfixes

Push a new package to NPM due to an [NPM bug](https://github.com/npm/npm/issues/5082) omitting the LICENSE file in 5.14.0.

Set `dataTransfer.effectAllowed` in `dragstart` handler to help browsers use the right drag icon.

Add the [mbox mode](http://codemirror.net/mode/mbox/index.html) to `mode/meta.js`.

## 5.14.0 (2016-04-20)

### Bugfixes

[`posFromIndex`](http://codemirror.net/doc/manual.html#posFromIndex) and [`indexFromPos`](http://codemirror.net/doc/manual.html#indexFromPos) now take [`lineSeparator`](http://codemirror.net/doc/manual.html#option_lineSeparator) into account.

[vim bindings](http://codemirror.net/demo/vim.html): Only call `.save()` when it is actually available.

[comment addon](http://codemirror.net/doc/manual.html#addon_comment): Be careful not to mangle multi-line strings.

[Python mode](http://codemirror.net/mode/python/index.html): Improve distinguishing of decorators from `@` operators.

[`findMarks`](http://codemirror.net/doc/manual.html#findMarks): No longer return marks that touch but don't overlap given range.

### New features

[vim bindings](http://codemirror.net/demo/vim.html): Add yank command.

[match-highlighter addon](http://codemirror.net/doc/manual.html#addon_match-highlighter): Add `trim` option to disable ignoring of whitespace.

[PowerShell mode](http://codemirror.net/mode/powershell/index.html): Added.

[Yacas mode](http://codemirror.net/mode/yacas/index.html): Added.

[Web IDL mode](http://codemirror.net/mode/webidl/index.html): Added.

[SAS mode](http://codemirror.net/mode/sas/index.html): Added.

[mbox mode](http://codemirror.net/mode/mbox/index.html): Added.

## 5.13.2 (2016-03-23)

### Bugfixes

Solves a problem where the gutter would sometimes not extend all the way to the end of the document.

## 5.13.0 (2016-03-21)

### New features

New DOM event forwarded: [`"dragleave"`](http://codemirror.net/doc/manual.html#event_dom).

[protobuf mode](http://codemirror.net/mode/protobuf/index.html): Newly added.

### Bugfixes



*   **Note:** Some events might now fire in slightly different order (`"change"` is still guaranteed to fire before `"cursorActivity"`)
*   Nested operations in multiple editors are now synced (complete at same time, reducing DOM reflows)
*   Visual block mode for [vim](http://codemirror.net/demo/vim.html) (<C-v>) is nearly complete
*   New mode: [Kotlin](http://codemirror.net/mode/kotlin/index.html)
*   Better multi-selection paste for text copied from multiple CodeMirror selections
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/4.3.0...4.4.0).





## 4.3.0 (2014-06-23)

*   Several [vim bindings](http://codemirror.net/demo/vim.html) improvements: search and exCommand history, global flag for `:substitute`, `:global` command.
*   Allow hiding the cursor by setting [`cursorBlinkRate`](http://codemirror.net/doc/manual.html#option_cursorBlinkRate) to a negative value.
*   Make gutter markers themeable, use this in foldgutter.
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/4.2.0...4.3.0).

## 4.2.0 (2014-05-19)

*   Fix problem where some modes were broken by the fact that empty tokens were forbidden.
*   Several fixes to context menu handling.
*   On undo, scroll _change_, not cursor, into view.
*   Rewritten [Jade](http://codemirror.net/mode/jade/index.html) mode.
*   Various improvements to [Shell](http://codemirror.net/mode/shell/index.html) (support for more syntax) and [Python](http://codemirror.net/mode/python/index.html) (better indentation) modes.
*   New mode: [Cypher](http://codemirror.net/mode/cypher/index.html).
*   New theme: [Neo](http://codemirror.net/demo/theme.html#neo).
*   Support direct styling options (color, line style, width) in the [rulers](http://codemirror.net/doc/manual.html#addon_rulers) addon.
*   Recognize per-editor configuration for the [show-hint](http://codemirror.net/doc/manual.html#addon_show-hint) and [foldcode](http://codemirror.net/doc/manual.html#addon_foldcode) addons.
*   More intelligent scanning for existing close tags in [closetag](http://codemirror.net/doc/manual.html#addon_closetag) addon.
*   In the [Vim bindings](http://codemirror.net/demo/vim.html): Fix bracket matching, support case conversion in visual mode, visual paste, append action.
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/4.1.0...4.2.0).

## 4.1.0 (2014-04-22)

*   _Slightly incompatible_: The [`"cursorActivity"`](http://codemirror.net/doc/manual.html#event_cursorActivity) event now fires after all other events for the operation (and only for handlers that were actually registered at the time the activity happened).
*   New command: [`insertSoftTab`](http://codemirror.net/doc/manual.html#command_insertSoftTab).
*   New mode: [Django](http://codemirror.net/mode/django/index.html).
*   Improved modes: [Verilog](http://codemirror.net/mode/verilog/index.html) (rewritten), [Jinja2](http://codemirror.net/mode/jinja2/index.html), [Haxe](http://codemirror.net/mode/haxe/index.html), [PHP](http://codemirror.net/mode/php/index.html) (string interpolation highlighted), [JavaScript](http://codemirror.net/mode/javascript/index.html) (indentation of trailing else, template strings), [LiveScript](http://codemirror.net/mode/livescript/index.html) (multi-line strings).
*   Many small issues from the 3.x→4.x transition were found and fixed.
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/4.0.3...4.1.0).

## 3.24.0 (2014-04-22)

Merges the improvements from 4.1 that could easily be applied to the 3.x code. Also improves the way the editor size is updated when line widgets change.

## 3.23.0 (2014-03-20)

*   In the [XML mode](http://codemirror.net/mode/xml/index.html), add `brackets` style to angle brackets, fix case-sensitivity of tags for HTML.
*   New mode: [Dylan](http://codemirror.net/mode/dylan/index.html).
*   Many improvements to the [Vim bindings](http://codemirror.net/demo/vim.html).

## 3.22.0 (2014-02-21)

*   Adds the [`findMarks`](http://codemirror.net/doc/manual.html#findMarks) method.
*   New addons: [rulers](http://codemirror.net/doc/manual.html#addon_rulers), markdown-fold, yaml-lint.
*   New theme: [mdn-like](http://codemirror.net/demo/theme.html#mdn-like).
*   New mode: [Solr](http://codemirror.net/mode/solr/index.html).
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/3.21.0...3.22.0).

## 3.21.0 (2014-01-16)

*   Auto-indenting a block will no longer add trailing whitespace to blank lines.
*   Marking text has a new option [`clearWhenEmpty`](http://codemirror.net/doc/manual.html#markText) to control auto-removal.
*   Several bugfixes in the handling of bidirectional text.
*   The [XML](http://codemirror.net/mode/xml/index.html) and [CSS](http://codemirror.net/mode/css/index.html) modes were largely rewritten. [LESS](http://codemirror.net/mode/css/less.html) support was added to the CSS mode.
*   The OCaml mode was moved to an [mllike](http://codemirror.net/mode/mllike/index.html) mode, F# support added.
*   Make it possible to fetch multiple applicable helper values with [`getHelpers`](http://codemirror.net/doc/manual.html#getHelpers), and to register helpers matched on predicates with [`registerGlobalHelper`](http://codemirror.net/doc/manual.html#registerGlobalHelper).
*   New theme [pastel-on-dark](http://codemirror.net/demo/theme.html#pastel-on-dark).
*   Better ECMAScript 6 support in [JavaScript](http://codemirror.net/mode/javascript/index.html) mode.
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/3.20.0...3.21.0).

## 3.20.0 (2013-11-21)

*   New modes: [Julia](http://codemirror.net/mode/julia/index.html) and [PEG.js](http://codemirror.net/mode/pegjs/index.html).
*   Support ECMAScript 6 in the [JavaScript mode](http://codemirror.net/mode/javascript/index.html).
*   Improved indentation for the [CoffeeScript mode](http://codemirror.net/mode/coffeescript/index.html).
*   Make non-printable-character representation [configurable](http://codemirror.net/doc/manual.html#option_specialChars).
*   Add ‘notification’ functionality to [dialog](http://codemirror.net/doc/manual.html#addon_dialog) addon.
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/3.19.0...3.20.0).

## 3.19.0 (2013-10-21)

*   New modes: [Eiffel](http://codemirror.net/mode/eiffel/index.html), [Gherkin](http://codemirror.net/mode/gherkin/index.html), [MSSQL dialect](http://codemirror.net/mode/sql/?mime=text/x-mssql).
*   New addons: [hardwrap](http://codemirror.net/doc/manual.html#addon_hardwrap), [sql-hint](http://codemirror.net/doc/manual.html#addon_sql-hint).
*   New theme: [MBO](http://codemirror.net/demo/theme.html#mbo).
*   Add [support](http://codemirror.net/doc/manual.html#token_style_line) for line-level styling from mode tokenizers.
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/3.18.0...3.19.0).

## 3.18.0 (2013-09-23)

Emergency release to fix a problem in 3.17 where `.setOption("lineNumbers", false)` would raise an error.

## 3.17.0 (2013-09-23)

*   New modes: [Fortran](http://codemirror.net/mode/fortran/index.html), [Octave](http://codemirror.net/mode/octave/index.html) (Matlab), [TOML](http://codemirror.net/mode/toml/index.html), and [DTD](http://codemirror.net/mode/dtd/index.html).
*   New addons: [`css-lint`](http://codemirror.net/addon/lint/css-lint.js), [`css-hint`](http://codemirror.net/doc/manual.html#addon_css-hint).
*   Improve resilience to CSS 'frameworks' that globally mess up `box-sizing`.
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/3.16.0...3.17.0).

## 3.16.0 (2013-08-21)

*   The whole codebase is now under a single [license](http://codemirror.net/LICENSE) file.
*   The project page was overhauled and redesigned.
*   New themes: [Paraiso](http://codemirror.net/demo/theme.html#paraiso-dark) ([light](http://codemirror.net/demo/theme.html#paraiso-light)), [The Matrix](http://codemirror.net/demo/theme.html#the-matrix).
*   Improved interaction between themes and [active-line](http://codemirror.net/doc/manual.html#addon_active-line)/[matchbrackets](http://codemirror.net/doc/manual.html#addon_matchbrackets) addons.
*   New [folding](http://codemirror.net/doc/manual.html#addon_foldcode) function `CodeMirror.fold.comment`.
*   Added [fullscreen](http://codemirror.net/doc/manual.html#addon_fullscreen) addon.
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/3.15.0...3.16.0).

## 3.15.0 (2013-07-29)

*   New modes: [Jade](http://codemirror.net/mode/jade/index.html), [Nginx](http://codemirror.net/mode/nginx/index.html).
*   New addons: [Tern](http://codemirror.net/demo/tern.html), [matchtags](http://codemirror.net/doc/manual.html#addon_matchtags), and [foldgutter](http://codemirror.net/doc/manual.html#addon_foldgutter).
*   Introduced [_helper_](http://codemirror.net/doc/manual.html#getHelper) concept ([context](https://groups.google.com/forum/#!msg/codemirror/cOc0xvUUEUU/nLrX1-qnidgJ)).
*   New method: [`getModeAt`](http://codemirror.net/doc/manual.html#getModeAt).
*   New themes: base16 [dark](http://codemirror.net/demo/theme.html#base16-dark)/[light](http://codemirror.net/demo/theme.html#base16-light), 3024 [dark](http://codemirror.net/demo/theme.html#3024-night)/[light](http://codemirror.net/demo/theme.html#3024-day), [tomorrow-night](http://codemirror.net/demo/theme.html#tomorrow-night-eighties).
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/3.14.0...3.15.0).

## 3.14.0 (2013-06-20)

*   New addons: [trailing space highlight](http://codemirror.net/doc/manual.html#addon_trailingspace), [XML completion](http://codemirror.net/doc/manual.html#addon_xml-hint) (rewritten), and [diff merging](http://codemirror.net/doc/manual.html#addon_merge).
*   [`markText`](http://codemirror.net/doc/manual.html#markText) and [`addLineWidget`](http://codemirror.net/doc/manual.html#addLineWidget) now take a `handleMouseEvents` option.
*   New methods: [`lineAtHeight`](http://codemirror.net/doc/manual.html#lineAtHeight), [`getTokenTypeAt`](http://codemirror.net/doc/manual.html#getTokenTypeAt).
*   More precise cleanness-tracking using [`changeGeneration`](http://codemirror.net/doc/manual.html#changeGeneration) and [`isClean`](http://codemirror.net/doc/manual.html#isClean).
*   Many extensions to [Emacs](http://codemirror.net/demo/emacs.html) mode (prefixes, more navigation units, and more).
*   New events [`"keyHandled"`](http://codemirror.net/doc/manual.html#event_keyHandled) and [`"inputRead"`](http://codemirror.net/doc/manual.html#event_inputRead).
*   Various improvements to [Ruby](http://codemirror.net/mode/ruby/index.html), [Smarty](http://codemirror.net/mode/smarty/index.html), [SQL](http://codemirror.net/mode/sql/index.html), and [Vim](http://codemirror.net/demo/vim.html) modes.
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/3.13.0...3.14.0).

## 3.13.0 (2013-05-20)

*   New modes: [COBOL](http://codemirror.net/mode/cobol/index.html) and [HAML](http://codemirror.net/mode/haml/index.html).
*   New options: [`cursorScrollMargin`](http://codemirror.net/doc/manual.html#option_cursorScrollMargin) and [`coverGutterNextToScrollbar`](http://codemirror.net/doc/manual.html#option_coverGutterNextToScrollbar).
*   New addon: [commenting](http://codemirror.net/doc/manual.html#addon_comment).
*   More features added to the [Vim keymap](http://codemirror.net/demo/vim.html).
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/v3.12...3.13.0).

## 3.12.0 (2013-04-19)

*   New mode: [GNU assembler](http://codemirror.net/mode/gas/index.html).
*   New options: [`maxHighlightLength`](http://codemirror.net/doc/manual.html#option_maxHighlightLength) and [`historyEventDelay`](http://codemirror.net/doc/manual.html#option_historyEventDelay).
*   Added [`addToHistory`](http://codemirror.net/doc/manual.html#mark_addToHistory) option for `markText`.
*   Various fixes to JavaScript tokenization and indentation corner cases.
*   Further improvements to the vim mode.
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/v3.11...v3.12).

## 3.11.0 (2013-03-20)

*   **Removed code:** `collapserange`, `formatting`, and `simple-hint` addons. `plsql` and `mysql` modes (use [`sql`](http://codemirror.net/mode/sql/index.html) mode).
*   **Moved code:** the range-finding functions for folding now have [their own files](http://codemirror.net/addon/fold/).
*   **Changed interface:** the [`continuecomment`](http://codemirror.net/doc/manual.html#addon_continuecomment) addon now exposes an option, rather than a command.
*   New modes: [SCSS](http://codemirror.net/mode/css/scss.html), [Tcl](http://codemirror.net/mode/tcl/index.html), [LiveScript](http://codemirror.net/mode/livescript/index.html), and [mIRC](http://codemirror.net/mode/mirc/index.html).
*   New addons: [`placeholder`](http://codemirror.net/demo/placeholder.html), [HTML completion](http://codemirror.net/demo/html5complete.html).
*   New methods: [`hasFocus`](http://codemirror.net/doc/manual.html#hasFocus), [`defaultCharWidth`](http://codemirror.net/doc/manual.html#defaultCharWidth).
*   New events: [`beforeCursorEnter`](http://codemirror.net/doc/manual.html#event_beforeCursorEnter), [`renderLine`](http://codemirror.net/doc/manual.html#event_renderLine).
*   Many improvements to the [`show-hint`](http://codemirror.net/doc/manual.html#addon_show-hint) completion dialog addon.
*   Tweak behavior of by-word cursor motion.
*   Further improvements to the [vim mode](http://codemirror.net/demo/vim.html).
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/v3.1...v3.11).

## 3.02.0 (2013-01-25)

Single-bugfix release. Fixes a problem that prevents CodeMirror instances from being garbage-collected after they become unused.

## 3.01.0 (2013-01-21)

*   Move all add-ons into an organized directory structure under [`/addon`](http://codemirror.net/addon/). **You might have to adjust your paths.**
*   New modes: [D](http://codemirror.net/mode/d/index.html), [Sass](http://codemirror.net/mode/sass/index.html), [APL](http://codemirror.net/mode/apl/index.html), [SQL](http://codemirror.net/mode/sql/index.html) (configurable), and [Asterisk](http://codemirror.net/mode/asterisk/index.html).
*   Several bugfixes in right-to-left text support.
*   Add [`rtlMoveVisually`](http://codemirror.net/doc/manual.html#option_rtlMoveVisually) option.
*   Improvements to vim keymap.
*   Add built-in (lightweight) [overlay mode](http://codemirror.net/doc/manual.html#addOverlay) support.
*   Support `showIfHidden` option for [line widgets](http://codemirror.net/doc/manual.html#addLineWidget).
*   Add simple [Python hinter](http://codemirror.net/doc/manual.html#addon_python-hint).
*   Bring back the [`fixedGutter`](http://codemirror.net/doc/manual.html#option_fixedGutter) option.
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/v3.0...v3.01).

## 3.1.0 (2013-02-21)

*   **Incompatible:** key handlers may now _return_, rather than _throw_ `CodeMirror.Pass` to signal they didn't handle the key.
*   Make documents a [first-class construct](http://codemirror.net/doc/manual.html#api_doc), support split views and subviews.
*   Add a [new module](http://codemirror.net/doc/manual.html#addon_show-hint) for showing completion hints. Deprecate `simple-hint.js`.
*   Extend [htmlmixed mode](http://codemirror.net/mode/htmlmixed/index.html) to allow custom handling of script types.
*   Support an `insertLeft` option to [`setBookmark`](http://codemirror.net/doc/manual.html#setBookmark).
*   Add an [`eachLine`](http://codemirror.net/doc/manual.html#eachLine) method to iterate over a document.
*   New addon modules: [selection marking](http://codemirror.net/demo/markselection.html), [linting](http://codemirror.net/demo/lint.html), and [automatic bracket closing](http://codemirror.net/demo/closebrackets.html).
*   Add [`"beforeChange"`](http://codemirror.net/doc/manual.html#event_beforeChange) and [`"beforeSelectionChange"`](http://codemirror.net/doc/manual.html#event_beforeSelectionChange) events.
*   Add [`"hide"`](http://codemirror.net/doc/manual.html#event_hide) and [`"unhide"`](http://codemirror.net/doc/manual.html#event_unhide) events to marked ranges.
*   Fix [`coordsChar`](http://codemirror.net/doc/manual.html#coordsChar)'s interpretation of its argument to match the documentation.
*   New modes: [Turtle](http://codemirror.net/mode/turtle/index.html) and [Q](http://codemirror.net/mode/q/index.html).
*   Further improvements to the [vim mode](http://codemirror.net/demo/vim.html).
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/v3.01...v3.1).

## 3.0.0 (2012-12-10)

**New major version**. Only partially backwards-compatible. See the [upgrading guide](http://codemirror.net/doc/upgrade_v3.html) for more information. Changes since release candidate 2:

*   Rewritten VIM mode.
*   Fix a few minor scrolling and sizing issues.
*   Work around Safari segfault when dragging.
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/v3.0rc2...v3.0).

## 2.38.0 (2013-01-21)

Integrate some bugfixes, enhancements to the vim keymap, and new modes ([D](http://codemirror.net/mode/d/index.html), [Sass](http://codemirror.net/mode/sass/index.html), [APL](http://codemirror.net/mode/apl/index.html)) from the v3 branch.

## 2.37.0 (2012-12-20)

*   New mode: [SQL](http://codemirror.net/mode/sql/index.html) (will replace [plsql](http://codemirror.net/mode/plsql/index.html) and [mysql](http://codemirror.net/mode/mysql/index.html) modes).
*   Further work on the new VIM mode.
*   Fix Cmd/Ctrl keys on recent Operas on OS X.
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/v2.36...v2.37).

## 2.36.0 (2012-11-20)

*   New mode: [Z80 assembly](http://codemirror.net/mode/z80/index.html).
*   New theme: [Twilight](http://codemirror.net/demo/theme.html#twilight).
*   Add command-line compression helper.
*   Make [`scrollIntoView`](http://codemirror.net/doc/manual.html#scrollIntoView) public.
*   Add [`defaultTextHeight`](http://codemirror.net/doc/manual.html#defaultTextHeight) method.
*   Various extensions to the vim keymap.
*   Make [PHP mode](http://codemirror.net/mode/php/index.html) build on [mixed HTML mode](http://codemirror.net/mode/htmlmixed/index.html).
*   Add [comment-continuing](http://codemirror.net/doc/manual.html#addon_continuecomment) add-on.
*   Full [list of patches](http://codemirror.net/https://github.com/codemirror/CodeMirror/compare/v2.35...v2.36).

## 2.35.0 (2012-10-22)

*   New (sub) mode: [TypeScript](http://codemirror.net/mode/javascript/typescript.html).
*   Don't overwrite (insert key) when pasting.
*   Fix several bugs in [`markText`](http://codemirror.net/doc/manual.html#markText)/undo interaction.
*   Better indentation of JavaScript code without semicolons.
*   Add [`defineInitHook`](http://codemirror.net/doc/manual.html#defineInitHook) function.
*   Full [list of patches](https://github.com/codemirror/CodeMirror/compare/v2.34...v2.35).

## 2.34.0 (2012-09-19)

*   New mode: [Common Lisp](http://codemirror.net/mode/commonlisp/index.html).
*   Fix right-click select-all on most browsers.
*   Change the way highlighting happens:
      Saves memory and CPU cycles.
      `compareStates` is no longer needed.
      `onHighlightComplete` no longer works.
*   Integrate mode (Markdown, XQuery, CSS, sTex) tests in central testsuite.
*   Add a [`CodeMirror.version`](http://codemirror.net/doc/manual.html#version) property.
*   More robust handling of nested modes in [formatting](http://codemirror.net/demo/formatting.html) and [closetag](http://codemirror.net/demo/closetag.html) plug-ins.
*   Un/redo now preserves [marked text](http://codemirror.net/doc/manual.html#markText) and bookmarks.
*   [Full list](https://github.com/codemirror/CodeMirror/compare/v2.33...v2.34) of patches.

## 2.33.0 (2012-08-23)

*   New mode: [Sieve](http://codemirror.net/mode/sieve/index.html).
*   New [`getViewPort`](http://codemirror.net/doc/manual.html#getViewport) and [`onViewportChange`](http://codemirror.net/doc/manual.html#option_onViewportChange) API.
*   [Configurable](http://codemirror.net/doc/manual.html#option_cursorBlinkRate) cursor blink rate.
*   Make binding a key to `false` disabling handling (again).
*   Show non-printing characters as red dots.
*   More tweaks to the scrolling model.
*   Expanded testsuite. Basic linter added.
*   Remove most uses of `innerHTML`. Remove `CodeMirror.htmlEscape`.
*   [Full list](https://github.com/codemirror/CodeMirror/compare/v2.32...v2.33) of patches.

## 2.32.0 (2012-07-23)

Emergency fix for a bug where an editor with line wrapping on IE will break when there is _no_ scrollbar.

## 2.31.0 (2012-07-20)

*   New modes: [OCaml](http://codemirror.net/mode/ocaml/index.html), [Haxe](http://codemirror.net/mode/haxe/index.html), and [VB.NET](http://codemirror.net/mode/vb/index.html).
*   Several fixes to the new scrolling model.
*   Add a [`setSize`](http://codemirror.net/doc/manual.html#setSize) method for programmatic resizing.
*   Add [`getHistory`](http://codemirror.net/doc/manual.html#getHistory) and [`setHistory`](http://codemirror.net/doc/manual.html#setHistory) methods.
*   Allow custom line separator string in [`getValue`](http://codemirror.net/doc/manual.html#getValue) and [`getRange`](http://codemirror.net/doc/manual.html#getRange).
*   Support double- and triple-click drag, double-clicking whitespace.
*   And more... [(all patches)](https://github.com/codemirror/CodeMirror/compare/v2.3...v2.31)

## 2.30.0 (2012-06-22)

*   **New scrollbar implementation**. Should flicker less. Changes DOM structure of the editor.
*   New theme: [vibrant-ink](http://codemirror.net/demo/theme.html#vibrant-ink).
*   Many extensions to the VIM keymap (including text objects).
*   Add [mode-multiplexing](http://codemirror.net/demo/multiplex.html) utility script.
*   Fix bug where right-click paste works in read-only mode.
*   Add a [`getScrollInfo`](http://codemirror.net/doc/manual.html#getScrollInfo) method.
*   Lots of other [fixes](https://github.com/codemirror/CodeMirror/compare/v2.25...v2.3).

## 2.25.0 (2012-05-23)

*   New mode: [Erlang](http://codemirror.net/mode/erlang/index.html).
*   **Remove xmlpure mode** (use [xml.js](http://codemirror.net/mode/xml/index.html)).
*   Fix line-wrapping in Opera.
*   Fix X Windows middle-click paste in Chrome.
*   Fix bug that broke pasting of huge documents.
*   Fix backspace and tab key repeat in Opera.

## 2.24.0 (2012-04-23)

*   **Drop support for Internet Explorer 6**.
*   New modes: [Shell](http://codemirror.net/mode/shell/index.html), [Tiki wiki](http://codemirror.net/mode/tiki/index.html), [Pig Latin](http://codemirror.net/mode/pig/index.html).
*   New themes: [Ambiance](http://codemirror.net/demo/theme.html#ambiance), [Blackboard](http://codemirror.net/demo/theme.html#blackboard).
*   More control over drag/drop with [`dragDrop`](http://codemirror.net/doc/manual.html#option_dragDrop) and [`onDragEvent`](http://codemirror.net/doc/manual.html#option_onDragEvent) options.
*   Make HTML mode a bit less pedantic.
*   Add [`compoundChange`](http://codemirror.net/doc/manual.html#compoundChange) API method.
*   Several fixes in undo history and line hiding.
*   Remove (broken) support for `catchall` in key maps, add `nofallthrough` boolean field instead.

## 2.23.0 (2012-03-26)

*   Change **default binding for tab**. Starting in 2.23, these bindings are default:
    *   Tab: Insert tab character
    *   Shift-tab: Reset line indentation to default
    *   Ctrl/Cmd-[: Reduce line indentation (old tab behaviour)
    *   Ctrl/Cmd-]: Increase line indentation (old shift-tab behaviour)
*   New modes: [XQuery](http://codemirror.net/mode/xquery/index.html) and [VBScript](http://codemirror.net/mode/vbscript/index.html).
*   Two new themes: [lesser-dark](http://codemirror.net/mode/less/index.html) and [xq-dark](http://codemirror.net/mode/xquery/index.html).
*   Differentiate between background and text styles in [`setLineClass`](http://codemirror.net/doc/manual.html#setLineClass).
*   Fix drag-and-drop in IE9+.
*   Extend [`charCoords`](http://codemirror.net/doc/manual.html#charCoords) and [`cursorCoords`](http://codemirror.net/doc/manual.html#cursorCoords) with a `mode` argument.
*   Add [`autofocus`](http://codemirror.net/doc/manual.html#option_autofocus) option.
*   Add [`findMarksAt`](http://codemirror.net/doc/manual.html#findMarksAt) method.

## 2.22.0 (2012-02-27)

*   Allow [key handlers](http://codemirror.net/doc/manual.html#keymaps) to pass up events, allow binding characters.
*   Add [`autoClearEmptyLines`](http://codemirror.net/doc/manual.html#option_autoClearEmptyLines) option.
*   Properly use tab stops when rendering tabs.
*   Make PHP mode more robust.
*   Support indentation blocks in [code folder](http://codemirror.net/doc/manual.html#addon_foldcode).
*   Add a script for [highlighting instances of the selection](http://codemirror.net/doc/manual.html#addon_match-highlighter).
*   New [.properties](http://codemirror.net/mode/properties/index.html) mode.
*   Fix many bugs.

## 2.21.0 (2012-01-27)

*   Added [LESS](http://codemirror.net/mode/less/index.html), [MySQL](http://codemirror.net/mode/mysql/index.html), [Go](http://codemirror.net/mode/go/index.html), and [Verilog](http://codemirror.net/mode/verilog/index.html) modes.
*   Add [`smartIndent`](http://codemirror.net/doc/manual.html#option_smartIndent) option.
*   Support a cursor in [`readOnly`](http://codemirror.net/doc/manual.html#option_readOnly)-mode.
*   Support assigning multiple styles to a token.
*   Use a new approach to drawing the selection.
*   Add [`scrollTo`](http://codemirror.net/doc/manual.html#scrollTo) method.
*   Allow undo/redo events to span non-adjacent lines.
*   Lots and lots of bugfixes.

## 2.20.0 (2011-12-20)

*   Slightly incompatible API changes. Read [this](http://codemirror.net/doc/upgrade_v2.2.html).
*   New approach to [binding](http://codemirror.net/doc/manual.html#option_extraKeys) keys, support for [custom bindings](http://codemirror.net/doc/manual.html#option_keyMap).
*   Support for overwrite (insert).
*   [Custom-width](http://codemirror.net/doc/manual.html#option_tabSize) and [stylable](http://codemirror.net/demo/visibletabs.html) tabs.
*   Moved more code into [add-on scripts](http://codemirror.net/doc/manual.html#addons).
*   Support for sane vertical cursor movement in wrapped lines.
*   More reliable handling of editing [marked text](http://codemirror.net/doc/manual.html#markText).
*   Add minimal [emacs](http://codemirror.net/demo/emacs.html) and [vim](http://codemirror.net/demo/vim.html) bindings.
*   Rename `coordsFromIndex` to [`posFromIndex`](http://codemirror.net/doc/manual.html#posFromIndex), add [`indexFromPos`](http://codemirror.net/doc/manual.html#indexFromPos) method.

## 2.18.0 (2011-11-21)

Fixes `TextMarker.clear`, which is broken in 2.17.

## 2.17.0 (2011-11-21)

*   Add support for [line wrapping](http://codemirror.net/doc/manual.html#option_lineWrapping) and [code folding](http://codemirror.net/doc/manual.html#hideLine).
*   Add [Github-style Markdown](http://codemirror.net/mode/gfm/index.html) mode.
*   Add [Monokai](http://codemirror.net/theme/monokai.css) and [Rubyblue](http://codemirror.net/theme/rubyblue.css) themes.
*   Add [`setBookmark`](http://codemirror.net/doc/manual.html#setBookmark) method.
*   Move some of the demo code into reusable components under [`lib/util`](http://codemirror.net/addon/).
*   Make screen-coord-finding code faster and more reliable.
*   Fix drag-and-drop in Firefox.
*   Improve support for IME.
*   Speed up content rendering.
*   Fix browser's built-in search in Webkit.
*   Make double- and triple-click work in IE.
*   Various fixes to modes.

## 2.16.0 (2011-10-27)

*   Add [Perl](http://codemirror.net/mode/perl/index.html), [Rust](http://codemirror.net/mode/rust/index.html), [TiddlyWiki](http://codemirror.net/mode/tiddlywiki/index.html), and [Groovy](http://codemirror.net/mode/groovy/index.html) modes.
*   Dragging text inside the editor now moves, rather than copies.
*   Add a [`coordsFromIndex`](http://codemirror.net/doc/manual.html#coordsFromIndex) method.
*   **API change**: `setValue` now no longer clears history. Use [`clearHistory`](http://codemirror.net/doc/manual.html#clearHistory) for that.
*   **API change**: [`markText`](http://codemirror.net/doc/manual.html#markText) now returns an object with `clear` and `find` methods. Marked text is now more robust when edited.
*   Fix editing code with tabs in Internet Explorer.

## 2.15.0 (2011-09-26)

Fix bug that snuck into 2.14: Clicking the character that currently has the cursor didn't re-focus the editor.

## 2.14.0 (2011-09-26)

*   Add [Clojure](http://codemirror.net/mode/clojure/index.html), [Pascal](http://codemirror.net/mode/pascal/index.html), [NTriples](http://codemirror.net/mode/ntriples/index.html), [Jinja2](http://codemirror.net/mode/jinja2/index.html), and [Markdown](http://codemirror.net/mode/markdown/index.html) modes.
*   Add [Cobalt](http://codemirror.net/theme/cobalt.css) and [Eclipse](http://codemirror.net/theme/eclipse.css) themes.
*   Add a [`fixedGutter`](http://codemirror.net/doc/manual.html#option_fixedGutter) option.
*   Fix bug with `setValue` breaking cursor movement.
*   Make gutter updates much more efficient.
*   Allow dragging of text out of the editor (on modern browsers).

## 2.13.0 (2011-08-23)

*   Add [Ruby](http://codemirror.net/mode/ruby/index.html), [R](http://codemirror.net/mode/r/index.html), [CoffeeScript](http://codemirror.net/mode/coffeescript/index.html), and [Velocity](http://codemirror.net/mode/velocity/index.html) modes.
*   Add [`getGutterElement`](http://codemirror.net/doc/manual.html#getGutterElement) to API.
*   Several fixes to scrolling and positioning.
*   Add [`smartHome`](http://codemirror.net/doc/manual.html#option_smartHome) option.
*   Add an experimental [pure XML](http://codemirror.net/mode/xmlpure/index.html) mode.

## 2.12.0 (2011-07-25)

*   Add a [SPARQL](http://codemirror.net/mode/sparql/index.html) mode.
*   Fix bug with cursor jumping around in an unfocused editor in IE.
*   Allow key and mouse events to bubble out of the editor. Ignore widget clicks.
*   Solve cursor flakiness after undo/redo.
*   Fix block-reindent ignoring the last few lines.
*   Fix parsing of multi-line attrs in XML mode.
*   Use `innerHTML` for HTML-escaping.
*   Some fixes to indentation in C-like mode.
*   Shrink horiz scrollbars when long lines removed.
*   Fix width feedback loop bug that caused the width of an inner DIV to shrink.

## 2.11.0 (2011-07-04)

*   Add a [Scheme mode](http://codemirror.net/mode/scheme/index.html).
*   Add a `replace` method to search cursors, for cursor-preserving replacements.
*   Make the [C-like mode](http://codemirror.net/mode/clike/index.html) mode more customizable.
*   Update XML mode to spot mismatched tags.
*   Add `getStateAfter` API and `compareState` mode API methods for finer-grained mode magic.
*   Add a `getScrollerElement` API method to manipulate the scrolling DIV.
*   Fix drag-and-drop for Firefox.
*   Add a C# configuration for the [C-like mode](http://codemirror.net/mode/clike/index.html).
*   Add [full-screen editing](http://codemirror.net/demo/fullscreen.html) and [mode-changing](http://codemirror.net/demo/changemode.html) demos.

## 2.10.0 (2011-06-07)

Add a [theme](http://codemirror.net/doc/manual.html#option_theme) system ([demo](http://codemirror.net/demo/theme.html)). Note that this is not backwards-compatible—you'll have to update your styles and modes!

## 2.2.0 (2011-06-07)

*   Add a [Lua mode](http://codemirror.net/mode/lua/index.html).
*   Fix reverse-searching for a regexp.
*   Empty lines can no longer break highlighting.
*   Rework scrolling model (the outer wrapper no longer does the scrolling).
*   Solve horizontal jittering on long lines.
*   Add [runmode.js](http://codemirror.net/demo/runmode.html).
*   Immediately re-highlight text when typing.
*   Fix problem with 'sticking' horizontal scrollbar.

## 2.1.0 (2011-05-26)

*   Add a [Smalltalk mode](http://codemirror.net/mode/smalltalk/index.html).
*   Add a [reStructuredText mode](http://codemirror.net/mode/rst/index.html).
*   Add a [Python mode](http://codemirror.net/mode/python/index.html).
*   Add a [PL/SQL mode](http://codemirror.net/mode/plsql/index.html).
*   `coordsChar` now works
*   Fix a problem where `onCursorActivity` interfered with `onChange`.
*   Fix a number of scrolling and mouse-click-position glitches.
*   Pass information about the changed lines to `onChange`.
*   Support cmd-up/down on OS X.
*   Add triple-click line selection.
*   Don't handle shift when changing the selection through the API.
*   Support `"nocursor"` mode for `readOnly` option.
*   Add an `onHighlightComplete` option.
*   Fix the context menu for Firefox.

## 2.0.0 (2011-03-28)

CodeMirror 2 is a complete rewrite that's faster, smaller, simpler to use, and less dependent on browser quirks. See [this](http://codemirror.net/doc/internals.html) and [this](http://groups.google.com/group/codemirror/browse_thread/thread/5a8e894024a9f580) for more information.


### 主要特性

- 支持“标准”Markdown / CommonMark和Github风格的语法，也可变身为代码编辑器；
- 支持实时预览、图片（跨域）上传、预格式文本/代码/表格插入、代码折叠、搜索替换、只读模式、自定义样式主题和多语言语法高亮等功能；
- 支持ToC（Table of Contents）、Emoji表情、Task lists、@链接等Markdown扩展语法；
- 支持TeX科学公式（基于KaTeX）、流程图 Flowchart 和 时序图 Sequence Diagram;
- 支持识别和解析HTML标签，并且支持自定义过滤标签解析，具有可靠的安全性和几乎无限的扩展性；
- 支持 AMD / CMD 模块化加载（支持 Require.js & Sea.js），并且支持自定义扩展插件；
- 兼容主流的浏览器（IE8+）和Zepto.js，且支持iPad等平板设备；
- 支持自定义主题样式；

# Editor.md

![](https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png)

![](https://img.shields.io/github/stars/pandao/editor.md.svg) ![](https://img.shields.io/github/forks/pandao/editor.md.svg) ![](https://img.shields.io/github/tag/pandao/editor.md.svg) ![](https://img.shields.io/github/release/pandao/editor.md.svg) ![](https://img.shields.io/github/issues/pandao/editor.md.svg) ![](https://img.shields.io/bower/v/editor.md.svg)

**目录 (Table of Contents)**

[TOCM]

[TOC]

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
# Heading 1 link [Heading link](https://github.com/pandao/editor.md "Heading link")
## Heading 2 link [Heading link](https://github.com/pandao/editor.md "Heading link")
### Heading 3 link [Heading link](https://github.com/pandao/editor.md "Heading link")
#### Heading 4 link [Heading link](https://github.com/pandao/editor.md "Heading link") Heading link [Heading link](https://github.com/pandao/editor.md "Heading link")
##### Heading 5 link [Heading link](https://github.com/pandao/editor.md "Heading link")
###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")

#### 标题（用底线的形式）Heading (underline)

This is an H1
=============

This is an H2
-------------

### 字符效果和横线等

----

~~删除线~~ <s>删除线（开启识别HTML标签时）</s>
*斜体字*      _斜体字_
**粗体**  __粗体__
***粗斜体*** ___粗斜体___

上标：X<sub>2</sub>，下标：O<sup>2</sup>

**缩写(同HTML的abbr标签)**

> 即更长的单词或短语的缩写形式，前提是开启识别HTML标签时，已默认开启

The <abbr title="Hyper Text Markup Language">HTML</abbr> specification is maintained by the <abbr title="World Wide Web Consortium">W3C</abbr>.

### 引用 Blockquotes

> 引用文本 Blockquotes

引用的行内混合 Blockquotes

> 引用：如果想要插入空白换行`即<br />标签`，在插入处先键入两个以上的空格然后回车即可，[普通链接](http://localhost/)。

### 锚点与链接 Links

[普通链接](http://localhost/)

[普通链接带标题](http://localhost/ "普通链接带标题")

直接链接：<https://github.com>

[锚点链接][anchor-id]

[anchor-id]: http://www.this-anchor-link.com/

GFM a-tail link @pandao

> @pandao

### 多语言代码高亮 Codes

#### 行内代码 Inline code

执行命令：`npm install marked`

#### 缩进风格

即缩进四个空格，也做为实现类似`pre`预格式化文本(Preformatted Text)的功能。

    <?php
        echo "Hello world!";
    ?>

预格式化文本：

    | First Header  | Second Header |
    | ------------- | ------------- |
    | Content Cell  | Content Cell  |
    | Content Cell  | Content Cell  |

#### JS代码　

```javascript
function test(){
	console.log("Hello world!");
}

(function(){
    var box = function(){
        return box.fn.init();
    };

    box.prototype = box.fn = {
        init : function(){
            console.log('box.init()');

			return this;
        },

		add : function(str){
			alert("add", str);

			return this;
		},

		remove : function(str){
			alert("remove", str);

			return this;
		}
    };

    box.fn.init.prototype = box.fn;

    window.box =box;
})();

var testBox = box();
testBox.add("jQuery").remove("jQuery");
```

#### HTML代码 HTML codes

```html
<!DOCTYPE html>
<html>
    <head>
        <mate charest="utf-8" />
        <title>Hello world!</title>
    </head>
    <body>
        <h1>Hello world!</h1>
    </body>
</html>
```

### 图片 Images

Image:

![](https://pandao.github.io/editor.md/examples/images/4.jpg)

> Follow your heart.

![](https://pandao.github.io/editor.md/examples/images/8.jpg)

> 图为：厦门白城沙滩

图片加链接 (Image + Link)：

[![](https://pandao.github.io/editor.md/examples/images/7.jpg)](https://pandao.github.io/editor.md/examples/images/7.jpg "李健首张专辑《似水流年》封面")

> 图为：李健首张专辑《似水流年》封面

----

### 列表 Lists

#### 无序列表（减号）Unordered Lists (-)

- 列表一
- 列表二
- 列表三

#### 无序列表（星号）Unordered Lists (*)

* 列表一
* 列表二
* 列表三

#### 无序列表（加号和嵌套）Unordered Lists (+)

+ 列表一
+ 列表二
    + 列表二-1
    + 列表二-2
    + 列表二-3
+ 列表三
    * 列表一
    * 列表二
    * 列表三

#### 有序列表 Ordered Lists (-)

1. 第一行
2. 第二行
3. 第三行

#### GFM task list

- [x] GFM task list 1
- [x] GFM task list 2
- [ ] GFM task list 3
    - [ ] GFM task list 3-1
    - [ ] GFM task list 3-2
    - [ ] GFM task list 3-3
- [ ] GFM task list 4
    - [ ] GFM task list 4-1
    - [ ] GFM task list 4-2

----

### 绘制表格 Tables

| 项目        | 价格   |  数量  |
| --------   | -----:  | :----:  |
| 计算机      | $1600   |   5     |
| 手机        |   $12   |   12   |
| 管线        |    $1    |  234  |

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

| Function name | Description                    |
| ------------- | ------------------------------ |
| `help()`      | Display the help window.       |
| `destroy()`   | **Destroy your computer!**     |

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |

| Item      | Value |
| --------- | -----:|
| Computer  | $1600 |
| Phone     |   $12 |
| Pipe      |    $1 |

----

#### 特殊符号 HTML Entities Codes

&copy; &  &uml; &trade; &iexcl; &pound;
&amp; &lt; &gt; &yen; &euro; &reg; &plusmn; &para; &sect; &brvbar; &macr; &laquo; &middot;

X&sup2; Y&sup3; &frac34; &frac14;  &times;  &divide;   &raquo;

18&ordm;C  &quot;  &apos;

### Emoji表情 :smiley:

> Blockquotes :star:

#### GFM task lists & Emoji & fontAwesome icon emoji & editormd logo emoji :editormd-logo-5x:

- [x] :smiley: @mentions, :smiley: #refs, [links](), **formatting**, and <del>tags</del> supported :editormd-logo:;
- [x] list syntax required (any unordered or ordered list supported) :editormd-logo-3x:;
- [x] [ ] :smiley: this is a complete item :smiley:;
- [ ] []this is an incomplete item [test link](#) :fa-star: @pandao;
- [ ] [ ]this is an incomplete item :fa-star: :fa-gear:;
    - [ ] :smiley: this is an incomplete item [test link](#) :fa-star: :fa-gear:;
    - [ ] :smiley: this is  :fa-star: :fa-gear: an incomplete item [test link](#);

#### 反斜杠 Escape

\*literal asterisks\*

### 科学公式 TeX(KaTeX)

$$E=mc^2$$

行内的公式$$E=mc^2$$行内的公式，行内的$$E=mc^2$$公式。

$$\(\sqrt{3x-1}+(1+x)^2\)$$

$$\sin(\alpha)^{\theta}=\sum_{i=0}^{n}(x^i + \cos(f))$$

多行公式：

```math
\displaystyle
\left( \sum\_{k=1}^n a\_k b\_k \right)^2
\leq
\left( \sum\_{k=1}^n a\_k^2 \right)
\left( \sum\_{k=1}^n b\_k^2 \right)
```

```katex
\displaystyle
    \frac{1}{
        \Bigl(\sqrt{\phi \sqrt{5}}-\phi\Bigr) e^{
        \frac25 \pi}} = 1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {
        1+\frac{e^{-6\pi}}
        {1+\frac{e^{-8\pi}}
         {1+\cdots} }
        }
    }
```

```latex
f(x) = \int_{-\infty}^\infty
    \hat f(\xi)\,e^{2 \pi i \xi x}
    \,d\xi
```

### 绘制流程图 Flowchart

```flow
st=>start: 用户登陆
op=>operation: 登陆操作
cond=>condition: 登陆成功 Yes or No?
e=>end: 进入后台

st->op->cond
cond(yes)->e
cond(no)->op
```

### 绘制序列图 Sequence Diagram

```seq
Andrew->China: Says Hello
Note right of China: China thinks\nabout it
China-->Andrew: How are you?
Andrew->>China: I am good thanks!
```

### End



















# 欢迎使用 Cmd Markdown 编辑阅读器

------

我们理解您需要更便捷更高效的工具记录思想，整理笔记、知识，并将其中承载的价值传播给他人，**Cmd Markdown** 是我们给出的答案 —— 我们为记录思想和分享知识提供更专业的工具。 您可以使用 Cmd Markdown：

> * 整理知识，学习笔记
> * 发布日记，杂文，所见所想
> * 撰写发布技术文稿（代码支持）
> * 撰写发布学术论文（LaTeX 公式支持）

![cmd-markdown-logo](https://www.zybuluo.com/static/img/logo.png)

除了您现在看到的这个 Cmd Markdown 在线版本，您还可以前往以下网址下载：

### [Windows/Mac/Linux 全平台客户端](https://www.zybuluo.com/cmd/)

> 请保留此份 Cmd Markdown 的欢迎稿兼使用说明，如需撰写新稿件，点击顶部工具栏右侧的 <i class="icon-file"></i> **新文稿** 或者使用快捷键 `Ctrl+Alt+N`。

------

## 什么是 Markdown

Markdown 是一种方便记忆、书写的纯文本标记语言，用户可以使用这些标记符号以最小的输入代价生成极富表现力的文档：譬如您正在阅读的这份文档。它使用简单的符号标记不同的标题，分割不同的段落，**粗体** 或者 *斜体* 某些文字，更棒的是，它还可以

### 1. 制作一份待办事宜 [Todo 列表](https://www.zybuluo.com/mdeditor?url=https://www.zybuluo.com/static/editor/md-help.markdown#13-待办事宜-todo-列表)

- [ ] 支持以 PDF 格式导出文稿
- [ ] 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率
- [x] 新增 Todo 列表功能
- [x] 修复 LaTex 公式渲染问题
- [x] 新增 LaTex 公式编号功能

### 2. 书写一个质能守恒公式[^LaTeX]

$$E=mc^2$$

### 3. 高亮一段代码[^code]

```python
@requires_authorization
class SomeClass:
    pass

if __name__ == '__main__':
    # A comment
    print 'hello world'
```

### 4. 高效绘制 [流程图](https://www.zybuluo.com/mdeditor?url=https://www.zybuluo.com/static/editor/md-help.markdown#7-流程图)

```flow
st=>start: Start
op=>operation: Your Operation
cond=>condition: Yes or No?
e=>end

st->op->cond
cond(yes)->e
cond(no)->op
```

### 5. 高效绘制 [序列图](https://www.zybuluo.com/mdeditor?url=https://www.zybuluo.com/static/editor/md-help.markdown#8-序列图)

```seq
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am good thanks!
```

### 6. 高效绘制 [甘特图](https://www.zybuluo.com/mdeditor?url=https://www.zybuluo.com/static/editor/md-help.markdown#9-甘特图)

```gantt
    title 项目开发流程
    section 项目确定
        需求分析       :a1, 2016-06-22, 3d
        可行性报告     :after a1, 5d
        概念验证       : 5d
    section 项目实施
        概要设计      :2016-07-05  , 5d
        详细设计      :2016-07-08, 10d
        编码          :2016-07-15, 10d
        测试          :2016-07-22, 5d
    section 发布验收
        发布: 2d
        验收: 3d
```

### 7. 绘制表格

| 项目        | 价格   |  数量  |
| --------   | -----:  | :----:  |
| 计算机     | \$1600 |   5     |
| 手机        |   \$12   |   12   |
| 管线        |    \$1    |  234  |

### 8. 更详细语法说明

想要查看更详细的语法说明，可以参考我们准备的 [Cmd Markdown 简明语法手册][1]，进阶用户可以参考 [Cmd Markdown 高阶语法手册][2] 了解更多高级功能。

总而言之，不同于其它 *所见即所得* 的编辑器：你只需使用键盘专注于书写文本内容，就可以生成印刷级的排版格式，省却在键盘和工具栏之间来回切换，调整内容和格式的麻烦。**Markdown 在流畅的书写和印刷级的阅读体验之间找到了平衡。** 目前它已经成为世界上最大的技术分享网站 GitHub 和 技术问答网站 StackOverFlow 的御用书写格式。

---

## 什么是 Cmd Markdown

您可以使用很多工具书写 Markdown，但是 Cmd Markdown 是这个星球上我们已知的、最好的 Markdown 工具——没有之一 ：）因为深信文字的力量，所以我们和你一样，对流畅书写，分享思想和知识，以及阅读体验有极致的追求，我们把对于这些诉求的回应整合在 Cmd Markdown，并且一次，两次，三次，乃至无数次地提升这个工具的体验，最终将它演化成一个 **编辑/发布/阅读** Markdown 的在线平台——您可以在任何地方，任何系统/设备上管理这里的文字。

### 1. 实时同步预览

我们将 Cmd Markdown 的主界面一分为二，左边为**编辑区**，右边为**预览区**，在编辑区的操作会实时地渲染到预览区方便查看最终的版面效果，并且如果你在其中一个区拖动滚动条，我们有一个巧妙的算法把另一个区的滚动条同步到等价的位置，超酷！

### 2. 编辑工具栏

也许您还是一个 Markdown 语法的新手，在您完全熟悉它之前，我们在 **编辑区** 的顶部放置了一个如下图所示的工具栏，您可以使用鼠标在工具栏上调整格式，不过我们仍旧鼓励你使用键盘标记格式，提高书写的流畅度。

![tool-editor](https://www.zybuluo.com/static/img/toolbar-editor.png)

### 3. 编辑模式

完全心无旁骛的方式编辑文字：点击 **编辑工具栏** 最右侧的拉伸按钮或者按下 `Ctrl + M`，将 Cmd Markdown 切换到独立的编辑模式，这是一个极度简洁的写作环境，所有可能会引起分心的元素都已经被挪除，超清爽！

### 4. 实时的云端文稿

为了保障数据安全，Cmd Markdown 会将您每一次击键的内容保存至云端，同时在 **编辑工具栏** 的最右侧提示 `已保存` 的字样。无需担心浏览器崩溃，机器掉电或者地震，海啸——在编辑的过程中随时关闭浏览器或者机器，下一次回到 Cmd Markdown 的时候继续写作。

### 5. 离线模式

在网络环境不稳定的情况下记录文字一样很安全！在您写作的时候，如果电脑突然失去网络连接，Cmd Markdown 会智能切换至离线模式，将您后续键入的文字保存在本地，直到网络恢复再将他们传送至云端，即使在网络恢复前关闭浏览器或者电脑，一样没有问题，等到下次开启 Cmd Markdown 的时候，她会提醒您将离线保存的文字传送至云端。简而言之，我们尽最大的努力保障您文字的安全。

### 6. 管理工具栏

为了便于管理您的文稿，在 **预览区** 的顶部放置了如下所示的 **管理工具栏**：

![tool-manager](https://www.zybuluo.com/static/img/toolbar-manager.jpg)

通过管理工具栏可以：

<i class="icon-share"></i> 发布：将当前的文稿生成固定链接，在网络上发布，分享
<i class="icon-file"></i> 新建：开始撰写一篇新的文稿
<i class="icon-trash"></i> 删除：删除当前的文稿
<i class="icon-cloud"></i> 导出：将当前的文稿转化为 Markdown 文本或者 Html 格式，并导出到本地
<i class="icon-reorder"></i> 列表：所有新增和过往的文稿都可以在这里查看、操作
<i class="icon-pencil"></i> 模式：切换 普通/Vim/Emacs 编辑模式

### 7. 阅读工具栏

![tool-manager](https://www.zybuluo.com/static/img/toolbar-reader.jpg)

通过 **预览区** 右上角的 **阅读工具栏**，可以查看当前文稿的目录并增强阅读体验。

工具栏上的五个图标依次为：

<i class="icon-list"></i> 目录：快速导航当前文稿的目录结构以跳转到感兴趣的段落
<i class="icon-chevron-sign-left"></i> 视图：互换左边编辑区和右边预览区的位置
<i class="icon-adjust"></i> 主题：内置了黑白两种模式的主题，试试 **黑色主题**，超炫！
<i class="icon-desktop"></i> 阅读：心无旁骛的阅读模式提供超一流的阅读体验
<i class="icon-fullscreen"></i> 全屏：简洁，简洁，再简洁，一个完全沉浸式的写作和阅读环境

### 8. 阅读模式

在 **阅读工具栏** 点击 <i class="icon-desktop"></i> 或者按下 `Ctrl+Alt+M` 随即进入独立的阅读模式界面，我们在版面渲染上的每一个细节：字体，字号，行间距，前背景色都倾注了大量的时间，努力提升阅读的体验和品质。

### 9. 标签、分类和搜索

在编辑区任意行首位置输入以下格式的文字可以标签当前文档：

标签： 未分类

标签以后的文稿在【文件列表】（Ctrl+Alt+F）里会按照标签分类，用户可以同时使用键盘或者鼠标浏览查看，或者在【文件列表】的搜索文本框内搜索标题关键字过滤文稿，如下图所示：

![file-list](https://www.zybuluo.com/static/img/file-list.png)

### 10. 文稿发布和分享

在您使用 Cmd Markdown 记录，创作，整理，阅读文稿的同时，我们不仅希望它是一个有力的工具，更希望您的思想和知识通过这个平台，连同优质的阅读体验，将他们分享给有相同志趣的人，进而鼓励更多的人来到这里记录分享他们的思想和知识，尝试点击 <i class="icon-share"></i> (Ctrl+Alt+P) 发布这份文档给好友吧！

------

再一次感谢您花费时间阅读这份欢迎稿，点击 <i class="icon-file"></i> (Ctrl+Alt+N) 开始撰写新的文稿吧！祝您在这里记录、阅读、分享愉快！

作者 [@ghosert][3]     
2016 年 07月 07日    

[^LaTeX]: 支持 **LaTeX** 编辑显示支持，例如：$\sum_{i=1}^n a_i=0$， 访问 [MathJax][4] 参考更多使用方法。

[^code]: 代码高亮功能支持包括 Java, Python, JavaScript 在内的，**四十一**种主流编程语言。

[1]: https://www.zybuluo.com/mdeditor?url=https://www.zybuluo.com/static/editor/md-help.markdown
[2]: https://www.zybuluo.com/mdeditor?url=https://www.zybuluo.com/static/editor/md-help.markdown#cmd-markdown-高阶语法手册
[3]: http://weibo.com/ghosert
[4]: http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference





---
title: 小书匠编辑器使用手册
tags: 小书匠,使用手册
---
# 概要
小书匠编辑器是一款专为markdown写作而设计的编辑器。
# 主要功能
1. **专为markdown写作设计的文档编辑器**，让用户心无旁骛的进行创作。
1. **多种编辑模式**。单栏编辑，双栏编辑，三栏编辑，全屏写作，全屏阅读...想怎么切换，就怎么切换，就是这样随心所欲。
1. **多种编辑器实现**。codemirror编辑器（提供vim,emacs按键，行专注等），ace编辑器（提供vim，emacs按键绑定，显示行号），轻量编辑器，CJK竖排编辑器
3. **多种主题选择**。包括编辑器主题，预览区代码高亮主题，及预览区用户自定义css。
4. **丰富的语法支持**。不仅提供了常用的commanmarkdown语法，还提供了许多有用的扩展语法，比如==Latex公式==，==表格==, ==目录==， ==脚注==, ==视频==, ==音频==, ==附件==, ==checklist==, ==流程图==等。更多语法可查看<小书匠语法使用手册>
4. **代码块文字格式语法**。语法可查看<小书匠语法使用手册>
5. **第三方同步**。==浏览器存储==, ==本地文件系统存储==, ==dropbox==, ==evernote==, ==印象笔记==,==有道笔记==, ==为知笔记==, ==github==等多种存储方案，保证了用户数据的安全，也让用户在存储方案上有了更多的选择。
6. **支持evernote，印象笔记**。提供双向操作，可以将文章保存到evernote/印象笔记上，也可以从evernote/印象笔记上导入数据。同时提供标签，附件，图片，待办等相关处理。
6. **强大的文件管理功能**。文件信息，标签，附件，音频，视频，图片管理。
7. **发布功能**。 支持将文章发布到博客平台上。
8. **邮件发送功能**。
9. **sourceMap对照功能**。方便在源markdown文件和生成的html文件上进行比较，特别适合markdown初学者使用，了解每一个markdown解析产生的结果，也适用于文章后期的校对上。
10. **ppt**。
11. **ppt跨屏演示**
12. **pdf预览**
13. **typewriter scrolling**
14. **autocomplete 和 snippets 功能**

# 离线版下载地址

http://soft.xiaoshujiang.com

# WEB版访问地址

http://markdown.xiaoshujiang.com

# 元数据使用说明

语法开关元数据项，可以到设置面板里的语法扩展标签页下查看对应的元数据标识．在元数据里true时，表示当前文档强制打开该语法，false时表示强制关闭该语法．如果没有对应的元数据，则使用全局设置里的语法开关.

`preview_previewType`元数据，可用的值为`normal`和`presentation`．用于文章在打开时，控制是否需要系统切换对应的预览界面．如果文章里没有该项元数据，或者元数据值不正确，则系统默认使用`normal`预览界面．该元数据仅控制文章打开时初始化的界面，用户依然可以通过按钮在不同预览界面间切换．


# 浏览器存储
系统对创建的文章，都会在浏览器存储上进行保存。包括像evernote/印象笔记/github/dropbox等导入的文章，也都会保存一份副本，并创建一个标识，表示跟哪些第三方存储关联。

## 标题，标签
文章标题的处理规则：如果文章内存在元数据title，则系统自动使用元数据内的title做为标题。如果文章未使用到元数据功能，用户可以通过维护文章信息按钮，修改标题。标签tags的规则也跟标题一样。
## 附件
文章使用`./`做为附件的引用标识。对于`图片`，`音频`，`视频`，`附件`等链接的处理，系统只处理以`./`开头的链接，并转换成附件真实的地址进行显示。用户可以通过工具栏的`插入图片`，`插入音频`，`插入视频`，`插入附件`等按钮上传附件。

# evernote/印象笔记
小书匠编辑器提供对evernote/印象笔记的支持，下面的使用说明默认用户已经完成了evernote/印象笔记的绑定操作，并将当前的工作平台切换到evernote/印象笔记下。
## 新建
通过新建按钮后，创建的文章将自动关联到evernote/印象笔记上(**注:这里仅仅是在文章上创建一个关联的标识，只有当用户保存后，才能在服务器上查看到新的笔记**)
## 打开
点击笔记，系统将自动把笔记导入，并将当前文章切换为导入的笔记内容。导入的文章自动与evernote/印象笔记上的笔记关联，下次再点击该笔记时，将直接从浏览器存储上打开。用户可以通过切换存储平台`浏览器存储`，来删除该缓存的文件。导入的笔记如果本地没有缓存，系统将对服务器上的笔记进行判断，如果笔记是通过小书匠编辑器进行保存，并且文章在保存后没有被操作过，则系统自动使用保存时附带的markdown附件做为文章内容，重新导入。如果笔记已经被修改，或者笔记不是通过小书匠编辑器进行保存的，系统将自动将文章转换成markdown格式。
## 保存
对于新创建的文章，用户可以直接保存`ctrl+s`，系统将弹出一个选择笔记本的窗口，确认后，系统将保存当前文章到evernote/印象笔记上。（在弹出窗口上选择笔记本时，如果用户选择了笔记，系统将覆盖该笔记）

对于已经存在的文章，但还没有保存到evernote/印象笔记，用户可以通过另存为`ctrl+shift+s`将当前文章保存到evernote/印象笔记上。

不管是保存，还是另存为，保存成功后，系统都将自动对当前文章与evernote/印象笔记上的笔记进行关联。下次保存时`ctrl+s`系统将自动同步保存到evernote/印象笔记上。
## 删除
系统不提供删除操作，用户需要自己到evernote/印象笔记端删除，如果本地缓存了笔记，可以通过`浏览器存储`删除缓存。
## 重命名
直接修改元数据title，如果文章内未使用元数据功能，可通过`浏览器存储`里的修改文章信息进行修改
## 标签管理
系统自动通过每篇文章的元数据`tags`提取为笔记的标签。
## 附件管理
打开时，系统自动将笔记上的附件导入到文章对应的附件管理器上。保存时，系统将根据**文章内对附件的引用**，将附件保存到服务器上。这里的引用包括`音频`，`视频`，`附件`，`图片`。如果文章内使用到了`流程图`，`序列图`，`公式`，`统计图`等，系统将会把这些内容转换成图片进行保存。由于evernote/印象笔记在部分终端不提供视频，音频的支持，查看保存的文章时，对应的音频，视频将以附件的形式存储。
## 待办事项
目前系统仅同步了待办事项。

# github/dropbox

## 新建
参考`evernote/印象笔记`的`新建`

## 打开
参考`evernote/印象笔记`的`打开`
不同的是，github/dropbox只能打开扩展名为`html`，`markdown`，`md`，`mkd`以及无扩展名的文件。
## 保存
参考`evernote/印象笔记`的`保存`
不同的是，github/dropbox保存时，仅保存了markdown文章本身，并不会将markdown转换成html进行保存，也不会处理附件相关的内容。
对于新文章的保存，github/dropbox存储需要用户指定文件名及存储的位置。

## 删除
系统不提供删除操作
## 重命名
系统不提供重命名操作，只能通过另存为`ctrl+shift+s`，保存成新的文件。

# 本地文件系统存储
本地文件系统存储仅在离线版提供支持。
## 新建
参考`evernote/印象笔记`的`新建`

## 打开
参考`github/dropbox`的`打开`
不同的是，本地文件系统存储在打开文件时，将会自动关联文章内的附件引用标识`./`，自动抓取同级目录下对应的附件资源。
## 保存
参考`github/dropbox`的`保存`
不同的是，本地文件系统存储在保存时，不仅保存了markdown文章，还会处理附件相关的内容，将附件保存到同级目录下，请确保附件的名称不要重复，防止数据被覆盖丢失。

## 删除
右击相应的文章可进行删除操作
## 重命名
右击相应的文章可进行重命名操作

# 发布
小书匠编辑器**离线版**提供文章发布功能，用户可以将自己的文章发布到博客系统上。发布功能实现了博客的metaweblogAPI（newPost, editPost, newMediaObject）。使用该发布功能，需要博客系统提供对应的api接口，系统将转换成html的文章和图片自动提交到博客系统上。

**配置发布示例：**
博客链接地址：比如`http://www.cnblogs.com/[用户名]/`
用户名：用户在该博客上的用户名
密码：用户在该博客上的密码

**测试通过的博客地址：**
博客园：`http://www.cnblogs.com/[用户名]/`
开源中国：`http://my.oschina.net/[用户名]/blog`

# 邮件发送
小书匠编辑器提供邮件发送功能，系统将对当前文章转换成html格式后进行发送，并对图片，视频等文件以附件的形式进行发送。

# 导出
小书匠编辑器提供多种格式的导出文件功能。==html==,==markdown==,==html(inlinestyle)==,==word==,==zip==,==pdf==。

**zip导出**： 该导出将导出文章的所有信息，包括markdown,html,markdown文章内引用的所有附件，公式，流程图等对应的图片文件，以及方便再次导入时需要的标识数据文件。

**pdf导出**：目前pdf导出只能在chrome版浏览器上使用。

# 导入
小书匠编辑器提供markdown, html, zip三种导入功能，并且实现了文本文件直接拖动导入功能。

**zip导入**：导入的zip文件必需是由小书匠编辑器导出的文件。

# 其他
web版实现了图片直接粘贴功能，用户不仅可以拖动图片上传，还可以直接复制粘贴图片。


# Browserslist [![Build Status][ci-img]][ci]

Get browser versions that match given criteria.
Useful for tools like [Autoprefixer].

You can select browsers by passing a string. This library will use
Can I Use data to return list of all matching versions.
For example, query to select all browser versions that are the last version
of each major browser, or have a usage of over 10% in global usage statistics:

```js
browserslist('last 1 version, > 10%');
//=> ["and_chr 51", "chrome 53", "chrome 52", "edge 14", "firefox 49",
//    "ie 11", "ie_mob 11", "ios_saf 10", "opera 39", "safari 10"]
```

To share browser support with users, you can use [browserl.ist](http://browserl.ist/).

<a href="https://evilmartians.com/?utm_source=browserslist">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
    alt="Sponsored by Evil Martians"
    width="236"
    height="54"
  \>
</a>

[Autoprefixer]: https://github.com/postcss/autoprefixer
[ci-img]:       https://travis-ci.org/ai/browserslist.svg
[ci]:           https://travis-ci.org/ai/browserslist

## Queries

Browserslist will use browsers criterias from:

1. First argument.
2. `BROWSERSLIST` environment variable.
3. `browserslist` config file in current or parent directories.
4. If all methods will not give a result, Browserslist will use defaults:
   `> 1%, last 2 versions, Firefox ESR`.

Multiple criteria are combined as a boolean `OR`. A browser version must match
at least one of the criteria to be selected.

You can specify the versions by queries (case insensitive):

* `last 2 versions`: the last 2 versions for each major browser.
* `last 2 Chrome versions`: the last 2 versions of Chrome browser.
* `> 5%`: versions selected by global usage statistics.
* `> 5% in US`: uses USA usage statistics. It accepts [two-letter country code].
* `> 5% in my stats`: uses [custom usage data].
* `ie 6-8`: selects an inclusive range of versions.
* `Firefox > 20`: versions of Firefox newer than 20.
* `Firefox >= 20`: versions of Firefox newer than or equal to 20.
* `Firefox < 20`: versions of Firefox less than 20.
* `Firefox <= 20`: versions of Firefox less than or equal to 20.
* `Firefox ESR`: the latest [Firefox ESR] version.
* `iOS 7`: the iOS browser version 7 directly.
* `not ie <= 8`: exclude browsers selected before by previous queries.
  You can add `not ` to any query.

Browserslist works with separated versions of browsers.
You should avoid queries like `Firefox > 0`.

All queries are based on the [Can I Use] support table, e. g. `last 3 iOS versions` might select `8.4, 9.2, 9.3` (mixed major & minor), whereas `last 3 Chrome versions` might select `50, 49, 48` (major only).

[two-letter country code]: http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements
[custom usage data]:       #custom-usage-data
[Can I Use]:               http://caniuse.com/

## Browsers

Names are case insensitive:

### Major Browsers

* `Chrome` for Google Chrome.
* `Firefox` or `ff` for Mozilla Firefox.
* `Explorer` or `ie` for Internet Explorer.
* `Edge` for Microsoft Edge.
* `iOS` or `ios_saf` for iOS Safari.
* `Opera` for Opera.
* `Safari` for desktop Safari.
* `ExplorerMobile` or `ie_mob` for Internet Explorer Mobile.

### Other

* `Android` for Android WebView.
* `BlackBerry` or `bb` for Blackberry browser.
* `ChromeAndroid` or `and_chr` for Chrome for Android
  (in Other section, because mostly same as common `Chrome`).
* `FirefoxAndroid` or `and_ff` for Firefox for Android.
* `OperaMobile` or `op_mob` for Opera Mobile.
* `OperaMini` or `op_mini` for Opera Mini.
* `Samsung` for Samsung Internet.
* `UCAndroid` or `and_uc` for UC Browser for Android.

## Config File

Browserslist’s config should be named `browserslist` and have browsers queries
split by a new line. Comments starts with `#` symbol:

```yaml
# Browsers that we support

> 1%
Last 2 versions
IE 8 # sorry
```

Browserslist will check config in every directory in `path`.
So, if tool process `app/styles/main.css`, you can put config to root,
`app/` or `app/styles`.

You can specify direct path to config by `config` option
or `BROWSERSLIST_CONFIG` environment variables.

## Environment Variables

If some tool use Browserslist inside, you can change browsers settings
by [environment variables]:

* `BROWSERSLIST` with browsers queries.

   ```sh
  BROWSERSLIST="> 5%" gulp css
   ```

* `BROWSERSLIST_CONFIG` with path to config file.

   ```sh
  BROWSERSLIST_CONFIG=./config/browserslist gulp css
   ```

* `BROWSERSLIST_STATS` with path to the custom usage data.

   ```sh
  BROWSERSLIST_STATS=./config/usage_data.json gulp css
   ```

[environment variables]: https://en.wikipedia.org/wiki/Environment_variable

## Custom Usage Data

If you have a website, you can query against the usage statistics of your site:

1. Import your Google Analytics data into [Can I Use].
   Press `Import…` button in Settings page.
2. Open browser DevTools on [caniuse.com] add paste this snippet into Console:

    ```js
   var e=document.createElement('a');e.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(JSON.stringify(JSON.parse(localStorage['usage-data-by-id'])[localStorage['config-primary_usage']])));e.setAttribute('download','stats.json');document.body.appendChild(e);e.click();document.body.removeChild(e);
    ```
3. Save data to file in your project.
4. Give it to Browserslist by `stats` option
   or `BROWSERSLIST_STATS` environment variable:

    ```js
   browserslist('> 5% in my stats', { stats: 'path/to/the/stats.json' });
    ```

Of course, you can generate usage statistics file by any other method.
Option `stats` accepts path to file or data itself:

```js
var custom = {
    ie: {
        6: 0.01,
        7: 0.4,
        8: 1.5
    },
    chrome: {
        …
    },
    …
};

browserslist('> 5% in my stats', { stats: custom });
```

Note that you can query against your custom usage data while also querying
against global or regional data. For example, the query
`> 5% in my stats, > 1%, > 10% in US` is permitted.

[Can I Use]: http://caniuse.com/

## Usage

```js
var browserslist = require('browserslist');

// Your CSS/JS build tool code
var process = function (css, opts) {
    var browsers = browserslist(opts.browsers, { path: opts.file });
    // Your code to add features for selected browsers
}
```

Queries can be a string `"> 5%, last 1 version"`
or an array `['> 5%', 'last 1 version']`.

If a query is missing, Browserslist will look for a config file.
You can provide a `path` option (that can be a file) to find the config file
relatively to it.

For non-JS environment and debug purpose you can use CLI tool:

```sh
browserslist "> 1%, last 2 version"
```

## Coverage

You can get total users coverage for selected browsers by JS API:

```js
browserslist.coverage(browserslist('> 1%')) //=> 81.4
```

```js
browserslist.coverage(browserslist('> 1% in US'), 'US') //=> 83.1
```

Or by CLI:

```sh
$ browserslist --coverage "> 1%"
These browsers account for 81.4% of all users globally
```

```sh
$ browserslist --coverage=US "> 1% in US"
These browsers account for 83.1% of all users in the US
```





# Release Notes

## Note

As of 3.0.0, the ReleaseNotes.md file has been deprecated. [Please refer to the release notes available on Github](https://github.com/chaijs/chai/releases). Or
[the release notes on the chaijs.com website](https://chaijs.com/releases).

---

## 2.3.0 / 2015-04-26

Added `ownPropertyDescriptor` assertion:

```js
expect('test').to.have.ownPropertyDescriptor('length');
expect('test').to.have.ownPropertyDescriptor('length', { enumerable: false, configurable: false, writable: false, value: 4 });
expect('test').not.to.have.ownPropertyDescriptor('length', { enumerable: false, configurable: false, writable: false, value: 3 });
expect('test').ownPropertyDescriptor('length').to.have.property('enumerable', false);
expect('test').ownPropertyDescriptor('length').to.have.keys('value');
```

### Community Contributions

#### Code Features & Fixes

 * [#408](https://github.com/chaijs/chai/pull/408) Add `ownPropertyDescriptor`
   assertion.
   By [@ljharb](https://github.com/ljharb)
 * [#422](https://github.com/chaijs/chai/pull/422) Improve ownPropertyDescriptor
   tests.
   By [@ljharb](https://github.com/ljharb)

#### Documentation fixes

 * [#417](https://github.com/chaijs/chai/pull/417) Fix documentation typo
 By [@astorije](https://github.com/astorije)
 * [#423](https://github.com/chaijs/chai/pull/423) Fix inconsistency in docs.
 By [@ehntoo](https://github.com/ehntoo)


## 2.2.0 / 2015-03-26

Deep property strings can now be escaped using `\\` - for example:

```js
var deepCss = { '.link': { '[target]': 42 }};
expect(deepCss).to.have.deep.property('\\.link.\\[target\\]', 42)
```

### Community Contributions

#### Code Features & Fixes

 * [#402](https://github.com/chaijs/chai/pull/402) Allow escaping of deep
   property keys.
   By [@umireon](https://github.com/umireon)

#### Documentation fixes

 * [#405](https://github.com/chaijs/chai/pull/405) Tweak documentation around
 deep property escaping.
 By [@keithamus](https://github.com/keithamus)


## 2.1.2 / 2015-03-15

A minor bug fix. No new features.

### Community Contributions

#### Code Features & Fixes

 * [#395](https://github.com/chaijs/chai/pull/395) Fix eval-related bugs with
   assert.operator ([#386](https://github.com/chaijs/chai/pull/386)).
   By [@cjqed](https://github.com/cjqed)

## 2.1.1 / 2015-03-04

Two minor bugfixes. No new features.

### Community Contributions

#### Code Features & Fixes

 * [#385](https://github.com/chaijs/chai/pull/385) Fix a bug (also described in
   [#387](https://github.com/chaijs/chai/pull/385)) where `deep.property` would not work with single
   key names. By [@eldritch-fossicker](https://github.com/eldritch-fossicker)
 * [#379](https://github.com/chaijs/chai/pull/379) Fix bug where tools which overwrite
   primitive prototypes, such as Babel or core-js would fail.
   By [@dcneiner](https://github.com/dcneiner)

#### Documentation fixes

 * [#382](https://github.com/chaijs/chai/pull/382) Add doc for showDiff argument in assert.
   By [@astorije](https://github.com/astorije)
 * [#383](https://github.com/chaijs/chai/pull/383) Improve wording for truncateTreshold docs
   By [@gurdiga](https://github.com/gurdiga)
 * [#381](https://github.com/chaijs/chai/pull/381) Improve wording for assert.empty docs
   By [@astorije](https://github.com/astorije)

## 2.1.0 / 2015-02-23

Small release; fixes an issue where the Chai lib was incorrectly reporting the
version number.

Adds new `should.fail()` and `expect.fail()` methods, which are convinience
methods to throw Assertion Errors.

### Community Contributions

#### Code Features & Fixes

 * [#356](https://github.com/chaijs/chai/pull/356) Add should.fail(), expect.fail(). By [@Soviut](https://github.com/Soviut)
 * [#374](https://github.com/chaijs/chai/pull/374) Increment version. By [@jmm](https://github.com/jmm)

## 2.0.0 / 2015-02-09

Unfortunately with 1.10.0 - compatibility broke with older versions because of
the `addChainableNoop`. This change has been reverted.

Any plugins using `addChainableNoop` should cease to do so.

Any developers wishing for this behaviour can use [dirty-chai](https://www.npmjs.com/package/dirty-chai)
by [@joshperry](https://github.com/joshperry)

### Community Contributions

#### Code Features & Fixes

 * [#361](https://github.com/chaijs/chai/pull/361) `.keys()` now accepts Objects, extracting keys from them. By [@gregglind](https://github.com/gregglind)
 * [#359](https://github.com/chaijs/chai/pull/359) `.keys()` no longer mutates passed arrays. By [@gregglind](https://github.com/gregglind)
 * [#349](https://github.com/chaijs/chai/pull/349) Add a new chainable keyword - `.which`. By [@toastynerd](https://github.com/toastynerd)
 * [#333](https://github.com/chaijs/chai/pull/333) Add `.change`, `.increase` and `.decrease` assertions. By [@cmpolis](https://github.com/cmpolis)
 * [#335](https://github.com/chaijs/chai/pull/335) `chai.util` is now exposed [@DingoEatingFuzz](https://github.com/DingoEatingFuzz)
 * [#328](https://github.com/chaijs/chai/pull/328) Add `.includes` and `.contains` aliases (for `.include` and `.contain`). By [@lo1tuma](https://github.com/lo1tuma)
 * [#313](https://github.com/chaijs/chai/pull/313) Add `.any.keys()` and `.all.keys()` qualifiers. By [@cjqed](https://github.com/cjqed)
 * [#312](https://github.com/chaijs/chai/pull/312) Add `assert.sameDeepMembers()`. By [@cjqed](https://github.com/cjqed)
 * [#311](https://github.com/chaijs/chai/pull/311) Add `assert.isAbove()` and `assert.isBelow()`. By [@cjqed](https://github.com/cjqed)
 * [#308](https://github.com/chaijs/chai/pull/308) `property` and `deep.property` now pass if a value is set to `undefined`. By [@prodatakey](https://github.com/prodatakey)
 * [#309](https://github.com/chaijs/chai/pull/309) optimize deep equal in Arrays. By [@ericdouglas](https://github.com/ericdouglas)
 * [#306](https://github.com/chaijs/chai/pull/306) revert #297 - allowing lint-friendly tests. By [@keithamus](https://github.com/keithamus)

#### Documentation fixes

 * [#357](https://github.com/chaijs/chai/pull/357) Copyright year updated in docs. By [@danilovaz](https://github.com/danilovaz)
 * [#325](https://github.com/chaijs/chai/pull/325) Fix documentation for overwriteChainableMethod. By [@chasenlehara](https://github.com/chasenlehara)
 * [#334](https://github.com/chaijs/chai/pull/334) Typo fix. By [@hurrymaplelad](https://github.com/hurrymaplelad)
 * [#317](https://github.com/chaijs/chai/pull/317) Typo fix. By [@jasonkarns](https://github.com/jasonkarns)
 * [#318](https://github.com/chaijs/chai/pull/318) Typo fix. By [@jasonkarns](https://github.com/jasonkarns)
 * [#316](https://github.com/chaijs/chai/pull/316) Typo fix. By [@jasonkarns](https://github.com/jasonkarns)


## 1.10.0 / 2014-11-10

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - No changes required
- **Plugin Developers:**
  - Review `addChainableNoop` notes below.
- **Core Contributors:**
  - Refresh `node_modules` folder for updated dependencies.

### Noop Function for Terminating Assertion Properties

The following assertions can now also be used in the function-call form:

* ok
* true
* false
* null
* undefined
* exist
* empty
* arguments
* Arguments

The above list of assertions are property getters that assert immediately on
access. Because of that, they were written to be used by terminating the assertion
chain with a property access.

```js
expect(true).to.be.true;
foo.should.be.ok;
```

This syntax is definitely aesthetically pleasing but, if you are linting your
test code, your linter will complain with an error something like "Expected an
assignment or function call and instead saw an expression." Since the linter
doesn't know about the property getter it assumes this line has no side-effects,
and throws a warning in case you made a mistake.

Squelching these errors is not a good solution as test code is getting to be
just as important as, if not more than, production code. Catching syntactical
errors in tests using static analysis is a great tool to help make sure that your
tests are well-defined and free of typos.

A better option was to provide a function-call form for these assertions so that
the code's intent is more clear and the linters stop complaining about something
looking off. This form is added in addition to the existing property access form
and does not impact existing test code.

```js
expect(true).to.be.true();
foo.should.be.ok();
```

These forms can also be mixed in any way, these are all functionally identical:

```js
expect(true).to.be.true.and.not.false();
expect(true).to.be.true().and.not.false;
expect(true).to.be.true.and.not.false;
```

#### Plugin Authors

If you would like to provide this function-call form for your terminating assertion
properties, there is a new function to register these types of asserts. Instead
of using `addProperty` to register terminating assertions, simply use `addChainableNoop`
instead; the arguments to both are identical. The latter will make the assertion
available in both the attribute and function-call forms and should have no impact
on existing users of your plugin.

### Community Contributions

- [#297](https://github.com/chaijs/chai/pull/297) Allow writing lint-friendly tests. [@joshperry](https://github.com/joshperry)
- [#298](https://github.com/chaijs/chai/pull/298) Add check for logging `-0`. [@dasilvacontin](https://github.com/dasilvacontin)
- [#300](https://github.com/chaijs/chai/pull/300) Fix #299: the test is defining global variables [@julienw](https://github.com/julienw)

Thank you to all who took time to contribute!

## 1.9.2 / 2014-09-29

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - No changes required
- **Plugin Developers:**
  - No changes required
- **Core Contributors:**
  - Refresh `node_modules` folder for updated dependencies.

### Community Contributions

- [#264](https://github.com/chaijs/chai/pull/264) Show diff for keys assertions [@cjthompson](https://github.com/cjthompson)
- [#267](https://github.com/chaijs/chai/pull/267) Use SVG badges [@shinnn](https://github.com/shinnn)
- [#268](https://github.com/chaijs/chai/pull/268) Allow messages to be functions (sinon-compat) [@charlierudolph](https://github.com/charlierudolph)
- [#269](https://github.com/chaijs/chai/pull/269) Remove unused argument for #lengthOf [@charlierudolph](https://github.com/charlierudolph)
- [#275](https://github.com/chaijs/chai/pull/275) Rewrite pretty-printing HTML elements to prevent throwing internal errors [@DrRataplan](https://github.com/DrRataplan)
- [#277](https://github.com/chaijs/chai/pull/277) Fix assert documentation for #sameMembers [@charlierudolph](https://github.com/charlierudolph)
- [#279](https://github.com/chaijs/chai/pull/279) closeTo should check value's type before assertion [@mohayonao](https://github.com/mohayonao)
- [#289](https://github.com/chaijs/chai/pull/289) satisfy is called twice [@charlierudolph](https://github.com/charlierudolph)
- [#292](https://github.com/chaijs/chai/pull/292) resolve conflicts with node-webkit and global usage [@boneskull](https://github.com/boneskull)

Thank you to all who took time to contribute!

## 1.9.1 / 2014-03-19

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - Migrate configuration options to new interface. (see notes)
- **Plugin Developers:**
  - No changes required
- **Core Contributors:**
  - Refresh `node_modules` folder for updated dependencies.

### Configuration

There have been requests for changes and additions to the configuration mechanisms
and their impact in the Chai architecture. As such, we have decoupled the
configuration from the `Assertion` constructor. This not only allows for centralized
configuration, but will allow us to shift the responsibility from the `Assertion`
constructor to the `assert` interface in future releases.

These changes have been implemented in a non-breaking way, but a depretiation
warning will be presented to users until they migrate. The old config method will
be removed in either `v1.11.0` or `v2.0.0`, whichever comes first.

#### Quick Migration

```js
// change this:
chai.Assertion.includeStack = true;
chai.Assertion.showDiff = false;

// ... to this:
chai.config.includeStack = true;
chai.config.showDiff = false;
```

#### All Config Options

##### config.includeStack

- **@param** _{Boolean}_
- **@default** `false`

User configurable property, influences whether stack trace is included in
Assertion error message. Default of `false` suppresses stack trace in the error
message.

##### config.showDiff

- **@param** _{Boolean}_
- **@default** `true`

User configurable property, influences whether or not the `showDiff` flag
should be included in the thrown AssertionErrors. `false` will always be `false`;
`true` will be true when the assertion has requested a diff be shown.

##### config.truncateThreshold **(NEW)**

- **@param** _{Number}_
- **@default** `40`

User configurable property, sets length threshold for actual and expected values
in assertion errors. If this threshold is exceeded, the value is truncated.

Set it to zero if you want to disable truncating altogether.

```js
chai.config.truncateThreshold = 0; // disable truncating
```

### Community Contributions

- [#228](https://github.com/chaijs/chai/pull/228) Deep equality check for memebers. [@duncanbeevers](https://github.com/duncanbeevers)
- [#247](https://github.com/chaijs/chai/pull/247) Proofreading. [@didorellano](https://github.com/didoarellano)
- [#244](https://github.com/chaijs/chai/pull/244) Fix `contain`/`include` 1.9.0 regression. [@leider](https://github.com/leider)
- [#233](https://github.com/chaijs/chai/pull/233) Improvements to `ssfi` for `assert` interface. [@refack](https://github.com/refack)
- [#251](https://github.com/chaijs/chai/pull/251) New config option: object display threshold. [@romario333](https://github.com/romario333)

Thank you to all who took time to contribute!

### Other Bug Fixes

- [#183](https://github.com/chaijs/chai/issues/183) Allow `undefined` for actual. (internal api)
- Update Karam(+plugins)/Istanbul to most recent versions.

## 1.9.0 / 2014-01-29

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - No changes required
- **Plugin Developers:**
  - Review [#219](https://github.com/chaijs/chai/pull/219).
- **Core Contributors:**
  - Refresh `node_modules` folder for updated dependencies.

### Community Contributions

- [#202](https://github.com/chaijs/chai/pull/201) Improve error message for .throw(). [@andreineculau](https://github.com/andreineculau)
- [#217](https://github.com/chaijs/chai/pull/217) Chai tests can be run with `--watch`. [@demands](https://github.com/demands)
- [#219](https://github.com/chaijs/chai/pull/219) Add overwriteChainableMethod utility. [@demands](https://github.com/demands)
- [#224](https://github.com/chaijs/chai/pull/224) Return error on throw method to chain on error properties. [@vbardales](https://github.com/vbardales)
- [#226](https://github.com/chaijs/chai/pull/226) Add `has` to language chains. [@duncanbeevers](https://github.com/duncanbeevers)
- [#230](https://github.com/chaijs/chai/pull/230) Support `{a:1,b:2}.should.include({a:1})` [@jkroso](https://github.com/jkroso)
- [#231](https://github.com/chaijs/chai/pull/231) Update Copyright notices to 2014 [@duncanbeevers](https://github.com/duncanbeevers)
- [#232](https://github.com/chaijs/chai/pull/232) Avoid error instantiation if possible on assert.throws. [@laconbass](https://github.com/laconbass)

Thank you to all who took time to contribute!

### Other Bug Fixes

- [#225](https://github.com/chaijs/chai/pull/225) Improved AMD wrapper provided by upstream `component(1)`.
- [#185](https://github.com/chaijs/chai/issues/185) `assert.throws()` returns thrown error for further assertions.
- [#237](https://github.com/chaijs/chai/pull/237) Remove coveralls/jscoverage, include istanbul coverage report in travis test.
- Update Karma and Sauce runner versions for consistent CI results. No more karma@canary.

## 1.8.1 / 2013-10-10

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - Refresh `node_modules` folder for updated dependencies.
- **Plugin Developers:**
  - No changes required
- **Core Contributors:**
  - Refresh `node_modules` folder for updated dependencies.

### Browserify

This is a small patch that updates the dependency tree so browserify users can install
chai. (Remove conditional requires)

## 1.8.0 / 2013-09-18

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - See `deep.equal` notes.
- **Plugin Developers:**
  - No changes required
- **Core Contributors:**
  - Refresh `node_modules` folder for updated dependencies.

### Deep Equals

This version of Chai focused on a overhaul to the deep equal utility. The code for this
tool has been removed from the core lib and can now be found at:
[chai / deep-eql](https://github.com/chaijs/deep-eql). As stated in previous releases,
this is part of a larger initiative to provide transparency, independent testing, and coverage for
some of the more complicated internal tools.

For the most part `.deep.equal` will behave the same as it has. However, in order to provide a
consistent ruleset across all types being tested, the following changes have been made and _might_
require changes to your tests.

**1.** Strict equality for non-traversable nodes according to [egal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).

_Previously:_ Non-traversable equal via `===`.

```js
expect(NaN).to.deep.equal(NaN);
expect(-0).to.not.deep.equal(+0);
```

**2.** Arguments are not Arrays (and all types must be equal):

_Previously:_ Some crazy nonsense that led to empty arrays deep equaling empty objects deep equaling dates.

```js
expect(arguments).to.not.deep.equal([]);
expect(Array.prototype.slice.call(arguments)).to.deep.equal([]);
```

- [#156](https://github.com/chaijs/chai/issues/156) Empty object is eql to empty array
- [#192](https://github.com/chaijs/chai/issues/192) empty object is eql to a Date object
- [#194](https://github.com/chaijs/chai/issues/194) refactor deep-equal utility

### CI and Browser Testing

Chai now runs the browser CI suite using [Karma](http://karma-runner.github.io/) directed at
[SauceLabs](https://saucelabs.com/). This means we get to know where our browser support stands...
and we get a cool badge:

[![Selenium Test Status](https://saucelabs.com/browser-matrix/logicalparadox.svg)](https://saucelabs.com/u/logicalparadox)

Look for the list of browsers/versions to expand over the coming releases.

- [#195](https://github.com/chaijs/chai/issues/195) karma test framework

## 1.7.2 / 2013-06-27

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - No changes required.
- **Plugin Developers:**
  - No changes required
- **Core Contributors:**
  - Refresh `node_modules` folder for updated dependencies.

### Coverage Reporting

Coverage reporting has always been available for core-developers but the data has never been published
for our end users. In our ongoing effort to improve accountability this data will now be published via
the [coveralls.io](https://coveralls.io/) service. A badge has been added to the README and the full report
can be viewed online at the [chai coveralls project](https://coveralls.io/r/chaijs/chai). Furthermore, PRs
will receive automated messages indicating how their PR impacts test coverage. This service is tied to TravisCI.

### Other Fixes

- [#175](https://github.com/chaijs/chai/issues/175) Add `bower.json`. (Fix ignore all)

## 1.7.1 / 2013-06-24

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - No changes required.
- **Plugin Developers:**
  - No changes required
- **Core Contributors:**
  - Refresh `node_modules` folder for updated dependencies.

### Official Bower Support

Support has been added for the Bower Package Manager ([bower.io])(http://bower.io/). Though
Chai could be installed via Bower in the past, this update adds official support via the `bower.json`
specification file.

- [#175](https://github.com/chaijs/chai/issues/175) Add `bower.json`.

## 1.7.0 / 2013-06-17

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - No changes required.
- **Plugin Developers:**
  - Review AssertionError update notice.
- **Core Contributors:**
  - Refresh `node_modules` folder for updated dependencies.

### AssertionError Update Notice

Chai now uses [chaijs/assertion-error](https://github.com/chaijs/assertion-error) instead an internal
constructor. This will allow for further iteration/experimentation of the AssertionError constructor
independant of Chai. Future plans include stack parsing for callsite support.

This update constructor has a different constructor param signature that conforms more with the standard
`Error` object. If your plugin throws and `AssertionError` directly you will need to update your plugin
with the new signature.

```js
var AssertionError = require('chai').AssertionError;

/**
 * previous
 *
 * @param {Object} options
 */

throw new AssertionError({
    message: 'An assertion error occurred'
  , actual: actual
  , expect: expect
  , startStackFunction: arguments.callee
  , showStack: true
});

/**
 * new
 *
 * @param {String} message
 * @param {Object} options
 * @param {Function} start stack function
 */

throw new AssertionError('An assertion error occurred', {
    actual: actual
  , expect: expect
  , showStack: true
}, arguments.callee);

// other signatures
throw new AssertionError('An assertion error occurred');
throw new AssertionError('An assertion error occurred', null, arguments.callee);
```

#### External Dependencies

This is the first non-developement dependency for Chai. As Chai continues to evolve we will begin adding
more; the next will likely be improved type detection and deep equality. With Chai's userbase continually growing
there is an higher need for accountability and documentation. External dependencies will allow us to iterate and
test on features independent from our interfaces.

Note: The browser packaged version `chai.js` will ALWAYS contain all dependencies needed to run Chai.

### Community Contributions

- [#169](https://github.com/chaijs/chai/pull/169) Fix deep equal comparison for Date/Regexp types. [@katsgeorgeek](https://github.com/katsgeorgeek)
- [#171](https://github.com/chaijs/chai/pull/171) Add `assert.notOk()`. [@Bartvds](https://github.com/Bartvds)
- [#173](https://github.com/chaijs/chai/pull/173) Fix `inspect` utility. [@domenic](https://github.com/domenic)

Thank you to all who took the time to contribute!

## 1.6.1 / 2013-06-05

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - No changes required.
- **Plugin Developers:**
  - No changes required.
- **Core Contributors:**
  - Refresh `node_modules` folder for updated developement dependencies.

### Deep Equality

Regular Expressions are now tested as part of all deep equality assertions. In previous versions
they silently passed for all scenarios. Thanks to [@katsgeorgeek](https://github.com/katsgeorgeek) for the contribution.

### Community Contributions

- [#161](https://github.com/chaijs/chai/pull/161) Fix documented name for assert interface's isDefined method. [@brandonpayton](https://github.com/brandonpayton)
- [#168](https://github.com/chaijs/chai/pull/168) Fix comparison equality of two regexps for when using deep equality. [@katsgeorgeek](https://github.com/katsgeorgeek)

Thank you to all who took the time to contribute!

### Additional Notes

- Mocha has been locked at version `1.8.x` to ensure `mocha-phantomjs` compatibility.

## 1.6.0 / 2013-04-29

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - No changes required.
- **Plugin Developers:**
  - No changes required.
- **Core Contributors:**
  - Refresh `node_modules` folder for updated developement dependencies.

### New Assertions

#### Array Members Inclusion

Asserts that the target is a superset of `set`, or that the target and `set` have the same members.
Order is not taken into account. Thanks to [@NickHeiner](https://github.com/NickHeiner) for the contribution.

```js
// (expect/should) full set
expect([4, 2]).to.have.members([2, 4]);
expect([5, 2]).to.not.have.members([5, 2, 1]);

// (expect/should) inclusion
expect([1, 2, 3]).to.include.members([3, 2]);
expect([1, 2, 3]).to.not.include.members([3, 2, 8]);

// (assert) full set
assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');

// (assert) inclusion
assert.includeMembers([ 1, 2, 3 ], [ 2, 1 ], 'include members');

```

#### Non-inclusion for Assert Interface

Most `assert` functions have a negative version, like `instanceOf()` has a corresponding `notInstaceOf()`.
However `include()` did not have a corresponding `notInclude()`. This has been added.

```js
assert.notInclude([ 1, 2, 3 ], 8);
assert.notInclude('foobar', 'baz');
```

### Community Contributions

- [#140](https://github.com/chaijs/chai/pull/140) Restore `call`/`apply` methods for plugin interface. [@RubenVerborgh](https://github.com/RubenVerborgh)
- [#148](https://github.com/chaijs/chai/issues/148)/[#153](https://github.com/chaijs/chai/pull/153) Add `members` and `include.members` assertions. [#NickHeiner](https://github.com/NickHeiner)

Thank you to all who took time to contribute!

### Other Bug Fixes

- [#142](https://github.com/chaijs/chai/issues/142) `assert#include` will no longer silently pass on wrong-type haystack.
- [#158](https://github.com/chaijs/chai/issues/158) `assert#notInclude` has been added.
- Travis-CI now tests Node.js `v0.10.x`. Support for `v0.6.x` has been removed. `v0.8.x` is still tested as before.

## 1.5.0 / 2013-02-03

### Migration Requirements

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - _Update [2013-02-04]:_ Some users may notice a small subset of deep equality assertions will no longer pass. This is the result of
  [#120](https://github.com/chaijs/chai/issues/120), an improvement to our deep equality algorithm. Users will need to revise their assertions
  to be more granular should this occur. Further information: [#139](https://github.com/chaijs/chai/issues/139).
- **Plugin Developers:**
  - No changes required.
- **Core Contributors:**
  - Refresh `node_modules` folder for updated developement dependencies.

### Community Contributions

- [#126](https://github.com/chaijs/chai/pull/126): Add `eqls` alias for `eql`. [@RubenVerborgh](https://github.com/RubenVerborgh)
- [#127](https://github.com/chaijs/chai/issues/127): Performance refactor for chainable methods. [@RubenVerborgh](https://github.com/RubenVerborgh)
- [#133](https://github.com/chaijs/chai/pull/133): Assertion `.throw` support for primitives. [@RubenVerborgh](https://github.com/RubenVerborgh)
- [#137](https://github.com/chaijs/chai/issues/137): Assertion `.throw` support for empty messages. [@timnew](https://github.com/timnew)
- [#136](https://github.com/chaijs/chai/pull/136): Fix backward negation messages when using `.above()` and `.below()`. [@whatthejeff](https://github.com/whatthejeff)

Thank you to all who took time to contribute!

### Other Bug Fixes

- Improve type detection of `.a()`/`.an()` to work in cross-browser scenarios.
- [#116](https://github.com/chaijs/chai/issues/116): `.throw()` has cleaner display of errors when WebKit browsers.
- [#120](https://github.com/chaijs/chai/issues/120): `.eql()` now works to compare dom nodes in browsers.


### Usage Updates

#### For Users

**1. Component Support:** Chai now included the proper configuration to be installed as a
[component](https://github.com/component/component). Component users are encouraged to consult
[chaijs.com](http://chaijs.com) for the latest version number as using the master branch
does not gaurantee stability.

```js
// relevant component.json
  devDependencies: {
    "chaijs/chai": "1.5.0"
  }
```

Alternatively, bleeding-edge is available:

    $ component install chaijs/chai

**2. Configurable showDiff:** Some test runners (such as [mocha](http://visionmedia.github.com/mocha/))
include support for showing the diff of strings and objects when an equality error occurs. Chai has
already included support for this, however some users may not prefer this display behavior. To revert to
no diff display, the following configuration is available:

```js
chai.Assertion.showDiff = false; // diff output disabled
chai.Assertion.showDiff = true; // default, diff output enabled
```

#### For Plugin Developers

**1. New Utility - type**: The new utility `.type()` is available as a better implementation of `typeof`
that can be used cross-browser. It handles the inconsistencies of Array, `null`, and `undefined` detection.

- **@param** _{Mixed}_ object to detect type of
- **@return** _{String}_ object type

```js
chai.use(function (c, utils) {
  // some examples
  utils.type({}); // 'object'
  utils.type(null); // `null'
  utils.type(undefined); // `undefined`
  utils.type([]); // `array`
});
```

#### For Core Contributors

**1. Browser Testing**: Browser testing of the `./chai.js` file is now available in the command line
via PhantomJS. `make test` and Travis-CI will now also rebuild and test `./chai.js`. Consequently, all
pull requests will now be browser tested in this way.

_Note: Contributors opening pull requests should still NOT include the browser build._

**2. SauceLabs Testing**: Early SauceLab support has been enabled with the file `./support/mocha-cloud.js`.
Those interested in trying it out should create a free [Open Sauce](https://saucelabs.com/signup/plan) account
and include their credentials in `./test/auth/sauce.json`.



[![Chai Documentation](http://chaijs.com/public/img/chai-logo.png)](http://chaijs.com)

[![license:mit](https://img.shields.io/badge/license-mit-green.svg?style=flat-square)](#license)<br>
[![tag:?](https://img.shields.io/github/tag/chaijs/chai.svg?style=flat-square)](https://github.com/chaijs/chai/releases)
[![build:?](https://img.shields.io/travis/chaijs/chai/master.svg?style=flat-square)](https://travis-ci.org/chaijs/chai)
[![coverage:?](https://img.shields.io/coveralls/chaijs/chai/master.svg?style=flat-square)](https://coveralls.io/r/chaijs/chai)<br>
[![npm:](https://img.shields.io/npm/v/chai.svg?style=flat-square)](https://www.npmjs.com/packages/chai)
[![dependencies:?](https://img.shields.io/npm/dm/chai.svg?style=flat-square)](https://www.npmjs.com/packages/chai)
[![devDependencies:?](https://img.shields.io/david/chaijs/chai.svg?style=flat-square)](https://david-dm.org/chaijs/chai)

[![Selenium Test Status](https://saucelabs.com/browser-matrix/chaijs.svg)](https://saucelabs.com/u/chaijs)

[![Slack Status](https://chai-slack.herokuapp.com/badge.svg)]( https://chai-slack.herokuapp.com/)
[![Join the chat at https://gitter.im/chaijs/chai](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/chaijs/chai)

Chai is a BDD / TDD assertion library for [node](http://nodejs.org) and the browser that
can be delightfully paired with any javascript testing framework.

For more information or to download plugins, view the [documentation](http://chaijs.com).

### Plugins

Chai offers a robust Plugin architecture for extending Chai's assertions and interfaces.

- Need a plugin? View the [official plugin list](http://chaijs.com/plugins).
- Have a plugin and want it listed? Open a Pull Request at [chaijs/chai-docs:plugin.js](https://github.com/chaijs/chai-docs/blob/master/plugins.js#L1-L12).
- Want to build a plugin? Read the [plugin api documentation](http://chaijs.com/guide/plugins/).

### Related Projects

- [chaijs / assertion-error](https://github.com/chaijs/assertion-error): Custom `Error` constructor thrown upon an assertion failing.
- [chaijs / deep-eql](https://github.com/chaijs/deep-eql): Improved deep equality testing for Node.js and the browser.
- [chaijs / type-detect](https://github.com/chaijs/type-detect): Improved typeof detection for node.js and the browser.

### Contributing

Thank you very much for considering to contribute!

Here are a few issues other contributors frequently ran into when opening pull requests:

- Please do not commit changes to the `chai.js` build. We do it once per release.
- Before pushing your commits, please make sure you [rebase](https://github.com/chaijs/chai/blob/master/CONTRIBUTING.md#pull-requests) them.

We also strongly encourage you to read our detailed [contribution guidelines](https://github.com/chaijs/chai/blob/master/CONTRIBUTING.md).

### Contributors

Please see the full
[Contributors Graph](https://github.com/chaijs/chai/graphs/contributors) for our
list of contributors.

### Core Contributors

Feel free to reach out to any of the core contributors with your questions or
concerns. We will do our best to respond in a timely manner.

[![Jake Luer](https://avatars3.githubusercontent.com/u/58988?v=3&s=50)](https://github.com/logicalparadox)
[![Veselin Todorov](https://avatars3.githubusercontent.com/u/330048?v=3&s=50)](https://github.com/vesln)
[![Keith Cirkel](https://avatars3.githubusercontent.com/u/118266?v=3&s=50)](https://github.com/keithamus)

## License

(The MIT License)

Copyright (c) 2011-2015 Jake Luer <jake@alogicalparadox.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
# Dillinger

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

Dillinger is a cloud-enabled, mobile-ready, offline-storage, AngularJS powered HTML5 Markdown editor.

  - Type some Markdown on the left
  - See HTML in the right
  - Magic

You can also:
  - Import and save files from GitHub, Dropbox, Google Drive and One Drive
  - Drag and drop files into Dillinger
  - Export documents as Markdown, HTML and PDF

Markdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As [John Gruber] writes on the [Markdown site][df1]

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

This text you see here is *actually* written in Markdown! To get a feel for Markdown's syntax, type some text into the left window and watch the results in the right.

### Tech

Dillinger uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Ace Editor] - awesome web-based text editor
* [markdown-it] - Markdown parser done right. Fast and easy to extend.
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Gulp] - the streaming build system
* [keymaster.js] - awesome keyboard handler lib by [@thomasfuchs]
* [jQuery] - duh

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

### Installation

Dillinger requires [Node.js](https://nodejs.org/) v4+ to run.

Download and extract the [latest pre-built release](https://github.com/joemccann/dillinger/releases).

Install the dependencies and devDependencies and start the server.

```sh
$ cd dillinger
$ npm install -d
$ node app
```

For production environments...

```sh
$ npm install --production
$ npm run predeploy
$ NODE_ENV=production node app
```

### Plugins

Dillinger is currently extended with the following plugins

* Dropbox
* Github
* Google Drive
* OneDrive

Readmes, how to use them in your own application can be found here:

* [plugins/dropbox/README.md] [PlDb]
* [plugins/github/README.md] [PlGh]
* [plugins/googledrive/README.md] [PlGd]
* [plugins/onedrive/README.md] [PlOd]

### Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ node app
```

Second Tab:
```sh
$ gulp watch
```

(optional) Third:
```sh
$ karma start
```
#### Building for source
For production release:
```sh
$ gulp build --prod
```
Generating pre-built zip archives for distribution:
```sh
$ gulp build dist --prod
```
### Docker
Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 80, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd dillinger
npm run-script build-docker
```
This will create the dillinger image and pull in the necessary dependencies. Moreover, this uses a _hack_ to get a more optimized `npm` build by copying the dependencies over and only installing when the `package.json` itself has changed.  Look inside the `package.json` and the `Dockerfile` for more details on how this works.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 80 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart="always" <youruser>/dillinger:latest
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:8000
```

#### Kubernetes + Google Cloud

See [KUBERNETES.md](https://github.com/joemccann/dillinger/blob/master/KUBERNETES.md)


#### docker-compose.yml

Change the path for the nginx conf mounting path to your full path, not mine!

### N|Solid and NGINX

More details coming soon.


### Todos

 - Write Tests
 - Rethink Github Save
 - Add Code Comments
 - Add Night Mode

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [@thomasfuchs]: <http://twitter.com/thomasfuchs>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [keymaster.js]: <https://github.com/madrobby/keymaster>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]:  <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>



aside

----------


# 欢迎使用马克飞象

@(示例笔记本)[马克飞象|帮助|Markdown]

**马克飞象**是一款专为印象笔记（Evernote）打造的Markdown编辑器，通过精心的设计与技术实现，配合印象笔记强大的存储和同步功能，带来前所未有的书写体验。特点概述：

- **功能丰富** ：支持高亮代码块、*LaTeX* 公式、流程图，本地图片以及附件上传，甚至截图粘贴，工作学习好帮手；
- **得心应手** ：简洁高效的编辑器，提供[桌面客户端][1]以及[离线Chrome App][2]，支持移动端 Web；
- **深度整合** ：支持选择笔记本和添加标签，支持从印象笔记跳转编辑，轻松管理。

-------------------

[TOC]

## Markdown简介

> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。    —— [维基百科](https://zh.wikipedia.org/wiki/Markdown)

正如您在阅读的这份文档，它使用简单的符号标识不同的标题，将某些文字标记为**粗体**或者*斜体*，创建一个[链接](http://www.example.com)或一个脚注[^demo]。下面列举了几个高级功能，更多语法请按`Ctrl + /`查看帮助。

### 代码块
``` python
@requires_authorization
def somefunc(param1='', param2=0):
    '''A docstring'''
    if param1 > param2: # interesting
        print 'Greater'
    return (param2 - param1 + 1) or None
class SomeClass:
    pass
>>> message = '''interpreter
... prompt'''
```
### LaTeX 公式

可以创建行内公式，例如 $\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$。或者块级公式：

$$	x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a} $$

### 表格
| Item      |    Value | Qty  |
| :-------- | --------:| :--: |
| Computer  | 1600 USD |  5   |
| Phone     |   12 USD |  12  |
| Pipe      |    1 USD | 234  |

### 流程图
```flow
st=>start: Start
e=>end
op=>operation: My Operation
cond=>condition: Yes or No?

st->op->cond
cond(yes)->e
cond(no)->op
```

以及时序图:

```sequence
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am good thanks!
```

> **提示：**想了解更多，请查看**流程图**[语法][3]以及**时序图**[语法][4]。

### 复选框

使用 `- [ ]` 和 `- [x]` 语法可以创建复选框，实现 todo-list 等功能。例如：

- [x] 已完成事项
- [ ] 待办事项1
- [ ] 待办事项2

> **注意：**目前支持尚不完全，在印象笔记中勾选复选框是无效、不能同步的，所以必须在**马克飞象**中修改 Markdown 原文才可生效。下个版本将会全面支持。


## 印象笔记相关

### 笔记本和标签
**马克飞象**增加了`@(笔记本)[标签A|标签B]`语法, 以选择笔记本和添加标签。 **绑定账号后**， 输入`(`自动会出现笔记本列表，请从中选择。

### 笔记标题
**马克飞象**会自动使用文档内出现的第一个标题作为笔记标题。例如本文，就是第一行的 `欢迎使用马克飞象`。

### 快捷编辑
保存在印象笔记中的笔记，右上角会有一个红色的编辑按钮，点击后会回到**马克飞象**中打开并编辑该笔记。
>**注意：**目前用户在印象笔记中单方面做的任何修改，马克飞象是无法自动感知和更新的。所以请务必回到马克飞象编辑。

### 数据同步
**马克飞象**通过**将Markdown原文以隐藏内容保存在笔记中**的精妙设计，实现了对Markdown的存储和再次编辑。既解决了其他产品只是单向导出HTML的单薄，又规避了服务端存储Markdown带来的隐私安全问题。这样，服务端仅作为对印象笔记 API调用和数据转换之用。

 >**隐私声明：用户所有的笔记数据，均保存在印象笔记中。马克飞象不存储用户的任何笔记数据。**

### 离线存储
**马克飞象**使用浏览器离线存储将内容实时保存在本地，不必担心网络断掉或浏览器崩溃。为了节省空间和避免冲突，已同步至印象笔记并且不再修改的笔记将删除部分本地缓存，不过依然可以随时通过`文档管理`打开。

> **注意：**虽然浏览器存储大部分时候都比较可靠，但印象笔记作为专业云存储，更值得信赖。以防万一，**请务必经常及时同步到印象笔记**。

## 编辑器相关
### 设置
右侧系统菜单（快捷键`Ctrl + M`）的`设置`中，提供了界面字体、字号、自定义CSS、vim/emacs 键盘模式等高级选项。

### 快捷键

帮助    `Ctrl + /`
同步文档    `Ctrl + S`
创建文档    `Ctrl + Alt + N`
最大化编辑器    `Ctrl + Enter`
预览文档 `Ctrl + Alt + Enter`
文档管理    `Ctrl + O`
系统菜单    `Ctrl + M`

加粗    `Ctrl + B`
插入图片    `Ctrl + G`
插入链接    `Ctrl + L`
提升标题    `Ctrl + H`

## 关于收费

**马克飞象**为新用户提供 10 天的试用期，试用期过后需要[续费](maxiang.info/vip.html)才能继续使用。未购买或者未及时续费，将不能同步新的笔记。之前保存过的笔记依然可以编辑。


## 反馈与建议
- 微博：[@马克飞象](http://weibo.com/u/2788354117)，[@GGock](http://weibo.com/ggock "开发者个人账号")
- 邮箱：<hustgock@gmail.com>

---------
感谢阅读这份帮助文档。请点击右上角，绑定印象笔记账号，开启全新的记录与分享体验吧。




[^demo]: 这是一个示例脚注。请查阅 [MultiMarkdown 文档](https://github.com/fletcher/MultiMarkdown/wiki/MultiMarkdown-Syntax-Guide#footnotes) 关于脚注的说明。 **限制：** 印象笔记的笔记内容使用 [ENML][5] 格式，基于 HTML，但是不支持某些标签和属性，例如id，这就导致`脚注`和`TOC`无法正常点击。


  [1]: http://maxiang.info/client_zh
  [2]: https://chrome.google.com/webstore/detail/kidnkfckhbdkfgbicccmdggmpgogehop
  [3]: http://adrai.github.io/flowchart.js/
  [4]: http://bramp.github.io/js-sequence-diagrams/
  [5]: https://dev.yinxiang.com/doc/articles/enml.php
