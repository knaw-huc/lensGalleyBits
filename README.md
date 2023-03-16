# OJS3  Lens-viewer plugin for [JATS](https://jats.nlm.nih.gov/archiving/) and [BITS](https://jats.nlm.nih.gov/extensions/bits/).

This plugin integrates an enhanced Version of the Lens Viewer which  supports BITS extensions.

# OJS 3.3.0.7 compatibility

See [this post](https://forum.pkp.sfu.ca/t/lensgalleybits-plugin-is-not-compatible-with-ojs-3-3/68398/8) for replacement of LensGalleyBitsPlugin.inc.php.

Removed non-existing constant `CDN_JQUERY_VERSION` to make it work.

Added .po files in locale for OJS 3.3 compatibility.

# Description

Browser-based HTML Viewer for Journal Articles and Monographs based on [JATS]((https://jats.nlm.nih.gov/archiving/))-standard XML files.based on elifescience Lens Viewer.

Functionality for [BITS](https://jats.nlm.nih.gov/extensions/bits/) (Book extension for JATS)  is available and constantly enhanced.

## Implemented Extensions


| Feature |	Status | Demo |
| --- | --- | --- |
| Audio/Video from external repositories| ✓ |[demo](https://heiup.uni-heidelberg.de/reader/index/310/310-69-79515-1-10-20171115.xml#figures) |
| Enhanced citation blocks (with unique IDs)   | ✓ | [demo](https://heiup.uni-heidelberg.de/reader/index/43/43-68-231-1-10-20151008.xml#content/box_25) |
| Footnotes formatting support   | ✓ |  [demo](https://heiup.uni-heidelberg.de/reader/index/48/48-68-599-1-10-20160428.xml#footnotes/article_footnote_60)|
| Footnotes internal navigation into references   | ✓ | [demo](https://heiup.uni-heidelberg.de/reader/index/310/310-69-79515-1-10-20171115.xml#figures)|
| Paragraph formatting using CSS-Stylesheets   | ✓ |[read here](https://github.com/withanage/UBHD-Lens/blob/master/README.md#open-your-browser)|
| Quotes (unique ids, formatting supported)  | ✓ | [demo](https://heiup.uni-heidelberg.de/reader/index/48/48-68-599-1-10-20160428.xml#content/quote_2)|
| Section metadata for monographs   | | |
| - Section authors/contributors | ✓ | [demo](https://heiup.uni-heidelberg.de/reader/index/345/345-68-81466-2-10-20180620.xml#content/heading_39) |
| - Section title| ✓ |[demo](https://heiup.uni-heidelberg.de/reader/index/345/345-68-81466-2-10-20180620.xml#content/heading_39)  |
| - Section Abstract | ✓ | [demo](https://heiup.uni-heidelberg.de/reader/index/345/345-68-81466-2-10-20180620.xml#content/heading_39)  |
| Speech-Element | ✓ | [demo](https://heiup.uni-heidelberg.de/reader/index/48/48-68-599-1-10-20160428.xml#content/speech_27)|
| Table display in reading panel | ✓ | [demo](https://heiup.uni-heidelberg.de/reader/index/345/345-68-81466-2-10-20180620.xml#content/html_table_2)|
| Table (unique id for reference)   | ✓ |[demo](https://heiup.uni-heidelberg.de/reader/index/345/345-68-81466-2-10-20180620.xml#content/html_table_2) |
| Table formatting using JATS XML Attributes and CSS-Stylesheets | ✓ | |
| Software Source-code in Lens | :construction:|[ticket](https://gitlab.ub.uni-heidelberg.de/wit/verlag-portale/issues/161) | 

* Source: https://github.com/withanage/UBHD-Lens 


## OJS 3 Installation
* Settings -> website -> plugins


###  Plugin gallery

You can install this plugin in the OJS Plugin gallery.

 
### Command line

#### OJS 3.2
```bash
cd $OJS_PATH/plugins/generic/
git clone https://github.com/withanage/lensGalleyBits.git lensGalleyBits
# Set rights for the web-user, if necessary. e.g sudo chown -R www-data:www-data lensGalleyBits/
```

#### OJS 3.1.2
```bash
cd $OJS_PATH/plugins/generic/
git clone https://github.com/withanage/lensGalleyBits.git lensGalleyBits
# Set rights for the web-user, if necessary. e.g sudo chown -R www-data:www-data lensGalleyBits/
```
## Configuration

* Navigate to page  `$MY_SERVER/$MY_OJS/index.php/$MY_JOURNAL/management/settings/website`

* Click on the tab -> plugins

* Disable the following  plugin or any html viewer plugins, if enabled.

![lens_standard](templates/images/lens_stanard.png)

* Enable this Lens viewer plugin you just downloaded
![lens_bits](templates/images/lens_bits.png)


* Submit your XML file into the journal and enjoy!

## Feature requests, Bugs
https://github.com/withanage/lensGalleyBits/issues

## Based on
https://github.com/asmecher/lensGalley


## Developers
* https://github.com/paflov
* https://github.com/withanage
* https://github.com/Vitaliy-1


 
