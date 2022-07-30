(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{277:function(e,t,a){e.exports=a.p+"assets/img/ig-platform.6e2af721.png"},278:function(e,t,a){e.exports=a.p+"assets/img/device-id.ffa2b089.png"},432:function(e,t,a){"use strict";a.r(t);var i=a(10),n=Object(i.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"intel-igpu-patching"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#intel-igpu-patching"}},[e._v("#")]),e._v(" Intel iGPU Patching")]),e._v(" "),t("p",[e._v("This guide will be a more in-depth look into patching macOS to support more hardware variations of Intel's iGPUs including proper display out, fixing color tint issues, HiDPI issues and etc. Note this guide is "),t("strong",[e._v("not")]),e._v(" a beginners tutorial, we recommend you follow the recommend iGPU properties listed in the config.plist section of the guide to start off.")]),e._v(" "),t("p",[e._v("This guide supports:")]),e._v(" "),t("ul",[t("li",[e._v("Sandy Bridge through Ice Lake iGPUs")])]),e._v(" "),t("h2",{attrs:{id:"terminology"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#terminology"}},[e._v("#")]),e._v(" Terminology")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",{staticStyle:{"text-align":"left"}},[e._v("Term")]),e._v(" "),t("th",{staticStyle:{"text-align":"left"}},[e._v("Description")])])]),e._v(" "),t("tbody",[t("tr",[t("td",{staticStyle:{"text-align":"left"}},[e._v("Framebuffer")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[e._v("Refers to the kext used in macOS to drive a GPU")])]),e._v(" "),t("tr",[t("td",{staticStyle:{"text-align":"left"}},[e._v("Framebuffer Profile")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[e._v("Profile in a framebuffer which determines how the iGPU will act")])]),e._v(" "),t("tr",[t("td",{staticStyle:{"text-align":"left"}},[e._v("WhateverGreen")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[e._v("Kext used to patch GPU drivers to better support PC hardware")])]),e._v(" "),t("tr",[t("td",{staticStyle:{"text-align":"left"}},[e._v("AAPL,ig-platform-id")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[e._v("Property used by macOS to determine the framebuffer profile with Ivy Bridge and newer")])]),e._v(" "),t("tr",[t("td",{staticStyle:{"text-align":"left"}},[e._v("AAPL,snb-platform-id")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[e._v("Property used by macOS to determine the framebuffer profile with Sandy Bridge")])]),e._v(" "),t("tr",[t("td",{staticStyle:{"text-align":"left"}},[e._v("device-id")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[e._v("Used by IOKit to match hardware to kexts")])])])]),e._v(" "),t("h2",{attrs:{id:"getting-started"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#getting-started"}},[e._v("#")]),e._v(" Getting started")]),e._v(" "),t("p",[e._v("Before we jump too deep into this rabbit hole, we should first explain what we're doing and why we need to do this.")]),e._v(" "),t("p",[t("strong",[e._v("Basic topics")]),e._v(":")]),e._v(" "),t("ul",[t("li",[t("RouterLink",{attrs:{to:"/gpu-patching/intel-patching//#aapl-ig-platform-id-explainer"}},[e._v("AAPL,ig-platform-id explainer")])],1),e._v(" "),t("li",[t("RouterLink",{attrs:{to:"/gpu-patching/intel-patching//#device-id-explainer"}},[e._v("device-id explainer")])],1)]),e._v(" "),t("h3",{attrs:{id:"aapl-ig-platform-id-explainer"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#aapl-ig-platform-id-explainer"}},[e._v("#")]),e._v(" AAPL,ig-platform-id explainer")]),e._v(" "),t("p",[e._v("By default in Macs with iGPUs, there are a few configurations:")]),e._v(" "),t("ul",[t("li",[e._v("iGPU is the sole display output\n"),t("ul",[t("li",[e._v('Commonly seen on Mac Minis, MacBook Airs, 13" MacBook Pros and iMacs without a dGPU')])])]),e._v(" "),t("li",[e._v("iGPU is only used for internal displays, and dGPUs are handling external displays\n"),t("ul",[t("li",[e._v('Commonly seen with 15" MacBook Pros')])])]),e._v(" "),t("li",[e._v("iGPU is solely used for internal compute, and dGPU handles all display outputs\n"),t("ul",[t("li",[e._v("Commonly seen with iMacs that include dGPUs")])])])]),e._v(" "),t("p",[e._v("The reason why this is important is due to the amount of iGPU configurations Apple supports in the iGPU kexts, specifically known as framebuffer personalities. These personalities determine many things including number of displays, types of displays allowed, location of these displays, minimum VRAM required, etc, and so we need to either hope one of these profiles matches our hardware or try to patch it.")]),e._v(" "),t("p",[e._v("To specify a framebuffer personality in macOS, we use the DeviceProperties section in OpenCore to add an entry called "),t("code",[e._v("AAPL,ig-platform-id")])]),e._v(" "),t("ul",[t("li",[e._v("Note: on Sandy Bridge, we use "),t("code",[e._v("AAPL,snb-platform-id")]),e._v(" instead")])]),e._v(" "),t("p",[e._v("The format of this entry is hexadecimal, and is byte swapped from the actual value. A full list of these values can be found in WhateverGreen's manual: "),t("a",{attrs:{href:"https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("FAQ.IntelHD.en.md"),t("OutboundLink")],1)]),e._v(" "),t("p",[e._v("For this example, lets try to find a framebuffer compatible for a desktop HD 4600 iGPU. We'll first want to scroll down the manual until we hit the "),t("a",{attrs:{href:"https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md#Intel-hd-graphics-4200-5200-haswell-processors",target:"_blank",rel:"noopener noreferrer"}},[e._v("Intel HD Graphics 4200-5200 (Haswell processors)"),t("OutboundLink")],1),e._v(" entry. Here we're given a list of all supported framebuffers in macOS, including the hardware type(ie. Mobile vs desktop), VRAM requirements, etc. If you scroll to the bottom of this list, you're also given some recommended options:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("Desktop :\n 0x0D220003 (default)\nLaptop :\n 0x0A160000 (default)\n 0x0A260005 (recommended)\n 0x0A260006 (recommended)\nEmpty Framebuffer :\n 0x04120004 (default)\n")])])]),t("p",[e._v("The first 2 entries are pretty obvious, however the last one(Empty Framebuffer) refers to systems where they have a dGPU already setup but still have an iGPU enabled in the background to handle tasks such as hardware accelerated decoding in tasks it excels at.")]),e._v(" "),t("p",[e._v("Now since we're using the desktop HD 4600, we'll grab the corresponding framebuffer profile: "),t("code",[e._v("0x0D220003")])]),e._v(" "),t("p",[e._v("Now by itself, we cannot use this in our config.plist. The reasoning being is that it's in Big Endian while macOS's IOService tree expects it to be in Little Endian. To convert it however is quite simple:")]),e._v(" "),t("div",{staticClass:"language-md extra-class"},[t("pre",{pre:!0,attrs:{class:"language-md"}},[t("code",[t("span",{pre:!0,attrs:{class:"token title important"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("#")]),e._v(" To start, remove the 0x and then space them out in pairs")]),e._v("\n0x0D220003 -> 0D 22 00 03\n\n"),t("span",{pre:!0,attrs:{class:"token title important"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("#")]),e._v(" Next, reverse the order but keep the pairs together")]),e._v("\n0D 22 00 03 -> 03 00 22 0D\n\n"),t("span",{pre:!0,attrs:{class:"token title important"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("#")]),e._v(" And now you have your final framebuffer profile")]),e._v("\n0300220D = AAPL,ig-platform-id\n")])])]),t("p",[e._v("From here, lets open up our config.plist and head to DeviceProperties -> Add. Now we'll want to add a new Entry called "),t("code",[e._v("PciRoot(0x0)/Pci(0x2,0x0)")]),e._v(". This is the location of Intel's iGPUs relative to the IOService path, and has been consistent as far back as Yonah series CPUs(2007+):")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",{staticStyle:{"text-align":"left"}},[e._v("Key")]),e._v(" "),t("th",{staticStyle:{"text-align":"left"}},[e._v("Type")]),e._v(" "),t("th",{staticStyle:{"text-align":"left"}},[e._v("Value")])])]),e._v(" "),t("tbody",[t("tr",[t("td",{staticStyle:{"text-align":"left"}},[e._v("AAPL,ig-platform-id")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[e._v("Data")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[e._v("0300220D")])])])]),e._v(" "),t("p",[t("img",{attrs:{src:a(277),alt:""}})]),e._v(" "),t("h3",{attrs:{id:"device-id-explainer"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#device-id-explainer"}},[e._v("#")]),e._v(" device-id explainer")]),e._v(" "),t("p",[t("code",[e._v("device-id")]),e._v(" is what macOS, or more specifically IOKit, uses to determine which devices are allowed to connect to which drivers. Why this is important for us is that Apple's iGPU drivers have a limited amount of IDs even though the kext itself can support much more.")]),e._v(" "),t("p",[e._v("To determine whether you need a new "),t("code",[e._v("device-id")]),e._v(" injected, you'll want to compare "),t("a",{attrs:{href:"https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("WhateverGreen's list of supported IDs"),t("OutboundLink")],1),e._v(" to what you have.")]),e._v(" "),t("p",[e._v("For this example, lets take a look at the i3-4150 with an HD 4400 iGPU. Using "),t("a",{attrs:{href:"https://ark.Intel.com/content/www/us/en/ark/products/77486/Intel-core-i3-4150-processor-3m-cache-3-50-ghz.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Intel's ARK page"),t("OutboundLink")],1),e._v(", we can see the following:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("Device ID = 0x41E\n")])])]),t("p",[e._v("Now that we have our actual Device ID, lets compare it to "),t("a",{attrs:{href:"https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("WhateverGreen's list"),t("OutboundLink")],1),e._v(":")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("Native supported DevIDs:\n\n 0x0d26\n 0x0a26\n 0x0a2e\n 0x0d22\n 0x0412\n")])])]),t("p",[e._v("Unfortunately the ID is not present in macOS, so we'll need to find a similar iGPU to ours and use their Device ID. The HD 4600 found in the "),t("a",{attrs:{href:"https://ark.Intel.com/content/www/us/en/ark/products/77769/Intel-core-i3-4330-processor-4m-cache-3-50-ghz.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("i3-4330"),t("OutboundLink")],1),e._v(" is a very close match, so we'll use its Device ID:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("Device ID = 0x412\n")])])]),t("p",[e._v("However, by default this cannot be injected. We'll need to first pad it to 8 bits and hex swap:")]),e._v(" "),t("div",{staticClass:"language-md extra-class"},[t("pre",{pre:!0,attrs:{class:"language-md"}},[t("code",[t("span",{pre:!0,attrs:{class:"token title important"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("#")]),e._v(" First, remove 0x and pad it to 8 bits by using 0's in front of it")]),e._v("\n0x412 -> 00 00 04 12\n\n"),t("span",{pre:!0,attrs:{class:"token title important"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("#")]),e._v(" Next reverse it, but keep the pairs in tact")]),e._v("\n00 00 04 12 -> 12 04 00 00\n\n"),t("span",{pre:!0,attrs:{class:"token title important"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("#")]),e._v(" And voila, you have your device-id")]),e._v("\n12040000 = device-id\n")])])]),t("p",[e._v("Now that we have our device-id, we'll do the same thing as before with ig-platform-id. Open your config.plist and add this new entry under "),t("code",[e._v("PciRoot(0x0)/Pci(0x2,0x0)")]),e._v(":")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",{staticStyle:{"text-align":"left"}},[e._v("Key")]),e._v(" "),t("th",{staticStyle:{"text-align":"left"}},[e._v("Type")]),e._v(" "),t("th",{staticStyle:{"text-align":"left"}},[e._v("Value")])])]),e._v(" "),t("tbody",[t("tr",[t("td",{staticStyle:{"text-align":"left"}},[e._v("device-id")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[e._v("Data")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[e._v("12040000")])])])]),e._v(" "),t("p",[t("img",{attrs:{src:a(278),alt:""}})]),e._v(" "),t("h2",{attrs:{id:"learning-to-patch-with-whatevergreen"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#learning-to-patch-with-whatevergreen"}},[e._v("#")]),e._v(" Learning to patch with WhateverGreen")]),e._v(" "),t("p",[e._v("Now that we've gone over the basics of setting up an iGPU, let's get into some deeper topics. We'll need to go over some  prerequisites first:")]),e._v(" "),t("ul",[t("li",[e._v("Lilu and WhateverGreen are present under EFI/OC/Kexts and in your config.plist\n"),t("ul",[t("li",[e._v("To verify if they loaded correctly in macOS, run the below command(if nothing is outputted, the kexts are not loading)")]),e._v(" "),t("li",[t("code",[e._v('kextstat | grep -E "Lilu|WhateverGreen"')])])])]),e._v(" "),t("li",[t("code",[e._v("DeviceProperties -> Add -> PciRoot(0x0)/Pci(0x2,0x0)")]),e._v(" has been correctly setup\n"),t("ul",[t("li",[e._v("Refer to your specific generation in the "),t("a",{attrs:{href:"https://dortania.github.io/OpenCore-Install-Guide/",target:"_blank",rel:"noopener noreferrer"}},[e._v("config.plist section"),t("OutboundLink")],1)])])])]),e._v(" "),t("p",[e._v("Now head forth into your framebuffer patching journey!:")]),e._v(" "),t("ul",[t("li",[t("RouterLink",{attrs:{to:"/gpu-patching/intel-patching/vram.html"}},[e._v("Patching the VRAM requirement of macOS")]),e._v(" "),t("ul",[t("li",[e._v("Relevant for systems with locked BIOS and cannot increase the VRAM")])])],1),e._v(" "),t("li",[t("RouterLink",{attrs:{to:"/gpu-patching/intel-patching/connector.html"}},[e._v("Patching the display type")]),e._v(" "),t("ul",[t("li",[e._v("Relevant for systems where you may get distorted colors on certain monitors")])])],1),e._v(" "),t("li",[t("RouterLink",{attrs:{to:"/gpu-patching/intel-patching/busid.html"}},[e._v("Patching the display connections")]),e._v(" "),t("ul",[t("li",[e._v("Relevant for systems where certain display outputs do not work")])])],1)])])}),[],!1,null,null,null);t.default=n.exports}}]);