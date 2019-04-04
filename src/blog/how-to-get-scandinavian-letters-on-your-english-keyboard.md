---
date: 2019-04-04T17:35:55.353Z
title: How to get Scandinavian letters on your English keyboard?
subtitle: 'I sure miss my æ, ø, å'
category: Casual
tags:
  - AutoHotKey
  - keybinding
  - scandinavia
  - danish alphabet
  - swedish alphabet
  - norwegian alphabet
  - english keyboard
  - american keyboard
  - british keyboard
image: /assets/stocksnap_vdovpj7hfk.jpg
type: blog
---
If you're from Scandinavia (Denmark, Norway or Sweden), there's a 100% chance that you've come across 3 unique letters in your alphabet. In Danish and Norwegian they are æ, ø, and å, in Swedish they are å, ä and ö. 

The problem arises when you use an English keyboard or any other keyboard that doesn't have these letters, and want to type your native language. I personally use an American Apple keyboard, because I like the feel and layout. If I need to type Danish, I would have to change the input layout on Windows, and then press the corresponding keys. While it's quick to change layout back and forth, it would be nice to just have those letters available somewhere in the English layout.

Behold! The solution. When using an Apple keyboard with Windows (and macOS, I think), you have F13 to F19 freely available to use. These are divided in a group of three and a group of four. F13, F14 and F15 are perfect candidates for our missing letters. They're also not too far from the typing area.

On Windows you can use [AutoHotKey ](https://www.autohotkey.com/)to bind characters (and many other actions for that matter) to keys. You can download it [here](https://www.autohotkey.com/download/ahk-install.exe).

I've taken the liberty of creating a script that binds the Scandinavian letters to those keys. You should be able to change the keys, if you'd like them elsewhere, as it's quite intuitive. Each letter also has a shift modifier, so you can write the capital letter as well.

**danish_letters.ahk/norwegian_letters.ahk**

```
#NoEnv
SendMode Input

F13::æ
+F13::Æ

F14::ø
+F14::Ø

F15::å
+F15::Å
```

**swedish_letters.ahk/finnish_letters.ahk**

```
#NoEnv
SendMode Input

F13::å
+F13::Å

F14::ä
+F14::Ä

F15::ö
+F15::Ö
```

To get this working, make sure AutoHotKey is installed. _You do not need to open it after._
To make sure the script opens at startup, go ahead an navigate to the startup folder. You can do this by pressing `Win` + `R` to bring up the 'Run' box, and typing `shell:startup`. In this folder, right click, and press New > AutoHotKey Script. Name it whatever you want, and paste in the appropriate script from above. You may modify it to your liking. You can find a list of modifier keys [here](https://autohotkey.com/docs/Hotkeys.htm#Symbols).

Alternatively, you can also modify your registry using [KeyTweak](https://www.bleepingcomputer.com/download/keytweak/), which may give better performance, but less flexibility.

Thank you for reading, and I hope this helped you out.
