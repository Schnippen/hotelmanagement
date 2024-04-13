import { Image, Text } from "@rneui/themed"
import React from "react"
import { View } from "react-native"
import TestSvg from "../Utils/MahjongTiles/Back.svg"
import { SvgXml } from "react-native-svg"

//tiles
//winning conditions
//tile component
//wall component
//center compass component with
//handle tile discard - double tap, or drag???
//hand component 
//handle turn? 
//https://www.npmjs.com/package/react-native-orientation-locker

//Colors
//Tile Front: e9ebe8
//tile shadow: bdbbc0
//tile back: 56a2c4

//types of styling
//-on hand NESW
//-on wall NESW
//-on sidetabke NESW
//-on River NESW
const xml = `
<svg
   xmlns:osb="http://www.openswatchbook.org/uri/2009/osb"
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   width="300"
   height="400"
   viewBox="0 0 300 400"
   id="svg2"
   version="1.1"
   inkscape:version="0.91 r13725"
   sodipodi:docname="Ton.svg"
   inkscape:export-filename="C:\Users\Fluffy\Documents\Projects\ExtraRiichi\Ton.png"
   inkscape:export-xdpi="180"
   inkscape:export-ydpi="180">
  <defs
     id="defs4">
    <inkscape:path-effect
       effect="skeletal"
       id="path-effect7963"
       is_visible="true"
       pattern="m -90.825902,-314.06958 23.03016,41.38503 13.798268,-41.38503 z"
       copytype="repeated_stretched"
       prop_scale="1"
       scale_y_rel="false"
       spacing="0"
       normal_offset="0"
       tang_offset="0"
       prop_units="false"
       vertical_pattern="false"
       fuse_tolerance="0"
       pattern-nodetypes="cccc" />
    <inkscape:path-effect
       effect="skeletal"
       id="path-effect7830"
       is_visible="true"
       pattern="M -12.828427,33.715729 -17,-11 l 9.0000001,0 z"
       copytype="repeated_stretched"
       prop_scale="-1"
       scale_y_rel="false"
       spacing="5.1"
       normal_offset="0"
       tang_offset="0"
       prop_units="false"
       vertical_pattern="false"
       fuse_tolerance="0"
       pattern-nodetypes="cccc" />
    <linearGradient
       id="linearGradient10055"
       osb:paint="solid">
      <stop
         style="stop-color:#000000;stop-opacity:1;"
         offset="0"
         id="stop10057" />
    </linearGradient>
    <marker
       inkscape:stockid="Arrow1Lstart"
       orient="auto"
       refY="0"
       refX="0"
       id="Arrow1Lstart"
       style="overflow:visible"
       inkscape:isstock="true">
      <path
         id="path4978"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 Z"
         style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:#ff5c00;stroke-width:1pt;stroke-opacity:1"
         transform="matrix(0.8,0,0,0.8,10,0)"
         inkscape:connector-curvature="0" />
    </marker>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4243">
      <circle
         style="opacity:1;fill:#000000;fill-opacity:0.29670332;fill-rule:nonzero;stroke:#000000;stroke-width:19.13299942;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
         id="circle4245"
         cx="-264.65997"
         cy="-198.20665"
         r="293.95438" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath7847">
      <ellipse
         style="opacity:1;fill:#822600;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
         id="ellipse7849"
         cx="394"
         cy="552.36218"
         rx="349.49533"
         ry="216" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4243-1">
      <circle
         style="opacity:1;fill:#000000;fill-opacity:0.29670332;fill-rule:nonzero;stroke:#000000;stroke-width:19.13299942;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
         id="circle4245-4"
         cx="-264.65997"
         cy="-198.20665"
         r="293.95438" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath7876">
      <circle
         style="opacity:1;fill:#000000;fill-opacity:0.29670332;fill-rule:nonzero;stroke:#000000;stroke-width:19.13299942;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
         id="circle7878"
         cx="-264.65997"
         cy="-198.20665"
         r="293.95438" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath14693">
      <rect
         style="opacity:1;fill:#a53c3c;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:8;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
         id="rect14695"
         width="131.78395"
         height="168.82127"
         x="-332.59583"
         y="383.49765"
         rx="1.2551664"
         ry="3.7514515"
         transform="matrix(0.99939083,-0.03489951,0.03489951,0.99939083,0,0)" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath14952">
      <ellipse
         style="opacity:1;fill:#a53c3c;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:7;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
         id="ellipse14954"
         cx="-271.34384"
         cy="647.25604"
         rx="69.057365"
         ry="116.91089"
         transform="matrix(0.99939083,-0.03489951,0.03489951,0.99939083,0,0)" />
    </clipPath>
  </defs>
  <sodipodi:namedview
     id="base"
     pagecolor="#aeffff"
     bordercolor="#666666"
     borderopacity="1"
     inkscape:pageopacity="0"
     inkscape:pageshadow="2"
     inkscape:zoom="0.50548197"
     inkscape:cx="363.15718"
     inkscape:cy="458.34028"
     inkscape:document-units="px"
     inkscape:current-layer="layer1"
     showgrid="true"
     inkscape:window-width="1920"
     inkscape:window-height="1017"
     inkscape:window-x="1912"
     inkscape:window-y="-8"
     inkscape:window-maximized="1"
     showguides="true"
     inkscape:guide-bbox="true"
     units="px">
    <inkscape:grid
       type="xygrid"
       id="grid4774"
       visible="true"
       dotted="false"
       color="#3f3fff"
       opacity="0.03921569"
       empcolor="#3f3fff"
       empopacity="0.07843137"
       enabled="false" />
    <sodipodi:guide
       position="150,200"
       orientation="0,1"
       id="guide8231"
       inkscape:label=""
       inkscape:color="rgb(0,0,255)" />
    <sodipodi:guide
       position="150,200"
       orientation="1,0"
       id="guide8233"
       inkscape:label=""
       inkscape:color="rgb(0,0,255)" />
  </sodipodi:namedview>
  <metadata
     id="metadata7">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title />
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1"
     transform="translate(0,-652.36216)">
    <g
       id="g4182"
       transform="matrix(0.90070005,0,0,0.97528977,22.480539,21.079387)">
      <path
         sodipodi:nodetypes="ccccccccccccccccccccccc"
         inkscape:connector-curvature="0"
         id="path4169"
         d="M 233.62512,755.29109 C 178.13441,766.77996 64.370638,790.79873 58.640429,785.71129 42.658218,774.8367 25.686157,781.4533 35.789288,796.11051 c 16.240064,27.58037 41.08272,52.95267 53.054176,82.84405 2.288277,4.33456 4.578233,5.00952 6.866511,4.97624 34.894055,0.59778 59.617015,-7.13696 92.959705,-10.00028 5.24648,-0.50585 12.18032,5.19713 16.07777,3.49424 3.45211,-1.88029 4.88869,-8.56661 5.7989,-12.75873 6.85855,-25.41545 28.05224,-47.67676 39.89617,-72.71328 1.50503,-2.99478 9.84505,-3.54971 9.78218,-6.44028 -1.21917,-10.81663 -17.3035,-30.7056 -26.59958,-30.22138 z m -23.13944,33.57895 c 12.46189,-0.30489 -0.39856,25.04533 -5.5016,26.11044 -5.68441,0.83505 -6.59045,-7.30247 -13.55667,-7.44593 -5.23392,0.54881 -4.04327,3.93106 -9.43905,5.54094 -32.92047,6.46479 -57.05235,8.76033 -91.40148,12.13597 -4.332557,0.10941 -15.065211,-17.22193 -9.013958,-18.63046 40.940618,-9.93723 109.784008,-17.44402 128.912758,-17.71096 z m -16.38918,50.02681 c 4.01395,6.86764 -2.84402,13.79985 -7.80917,14.56359 -30.19331,4.51502 -78.25363,12.14709 -82.00667,8.23091 -2.66879,-2.84434 -8.082537,-10.97917 -7.221842,-16.53793 11.136252,-3.71556 92.300252,-14.42426 97.037682,-6.25657 z"
         style="fill:#142896;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
      <path
         sodipodi:nodetypes="ccccccccccscccc"
         inkscape:connector-curvature="0"
         id="path4165"
         d="m 123.10112,656.13043 c -18.37065,-7.40086 -20.37189,5.83216 -17.90295,14.33847 6.2135,20.20143 14.42853,28.63207 24.53852,42.67785 1.80515,2.41778 3.80884,7.05879 3.50496,9.27068 l -2.80317,207.5969 c 0.0245,6.49844 -1.22391,27.05521 -5.33713,23.81363 -16.25707,-12.35739 -21.17086,-19.29273 -47.244611,-51.54601 -11.141011,-14.92882 -19.888636,-6.9441 -6.365572,12.59128 42.459393,54.62391 46.079123,59.83408 46.706613,115.10687 1.6238,29.1788 31.75855,24.6486 34.5721,6.1383 3.42954,-19.9718 -1.64734,-51.78318 -1.84988,-73.7618 -0.77433,-84.02764 -0.85925,-158.3381 12.84541,-239.53344 2.59385,-12.6668 22.99001,-23.06614 33.97476,-26.71095 4.86607,-1.61964 10.28698,-13.97417 0.90028,-14.45229 -25.17978,-2.64878 -52.28301,-15.55116 -75.53933,-25.52949 z"
         style="fill:#142896;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
      <path
         sodipodi:nodetypes="cccccc"
         inkscape:connector-curvature="0"
         id="path4167"
         d="m 90.058998,749.95518 c -28.498411,-1.30744 -7.40777,15.78722 -1.003352,15.35489 35.469434,-3.22236 93.934624,-11.66451 130.102704,-19.88981 2.50231,-0.0783 -0.19108,-17.18993 -17.33839,-18.91906 -5.21285,-0.25484 -4.31683,2.60115 -10.47943,4.83506 -27.63258,6.00227 -76.15552,20.22066 -101.281532,18.61892 z"
         style="fill:#142896;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
      <path
         sodipodi:nodetypes="ccccc"
         inkscape:connector-curvature="0"
         id="path4178"
         d="M 101.07932,860.47476 C 81.038575,899.28326 62.611644,913.1005 1.9825743,939.28575 -21.477214,948.67859 -19.805065,962.93934 8.6272375,953.18208 85.796234,923.19531 101.97857,904.47533 114.56321,868.12926 Z"
         style="fill:#142896;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
      <path
         sodipodi:nodetypes="ccccccc"
         inkscape:connector-curvature="0"
         id="path4180"
         d="m 148.90381,861.23655 c 24.81185,28.93873 58.74403,106.95253 77.55965,95.36697 14.85312,-9.54021 33.94987,-10.66782 42.06647,-8.48169 10.62302,2.79871 11.13375,7.75465 17.07981,10.96967 15.63489,6.5882 12.36449,-2.02074 6.9373,-9.59456 -14.04344,-21.5996 -80.57109,-34.66827 -122.31035,-92.57081 z"
         style="fill:#142896;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    </g>
  </g>
</svg>
`;
const TileComponent =()=>{
const tileRatio = 3
const tileWidth=30*tileRatio //30 x 3
const tileHeight=39*tileRatio //39 x 3
const tileDepth= 23 // is not taking perspective into account
const tileHeightHandPlayerPerspective=tileHeight+tileDepth
const tileBorderRadiusHandPlayerPerspecive=8
//ramka 5 px - szare 13   = 18 +1 = 19+2=21
//sare ma padding 1 z lewej i prawej, kontur ma grubość 2 //TODO create perspective that is scalable
    return(
        <View style={{backgroundColor:'#56a2c4',height:tileHeight+23,width:tileWidth,justifyContent:"flex-end",borderRadius:tileBorderRadiusHandPlayerPerspecive,borderWidth:1}}>
        <View style={{backgroundColor:"#bdbbc0",height:tileHeight+16,width:tileWidth-2,justifyContent:"flex-end",borderRadius:tileBorderRadiusHandPlayerPerspecive,alignItems:"center"}}>
        <View style={{backgroundColor:"#e9ebe8", height:tileHeight,width:tileWidth-2,alignItems:"center",justifyContent:"center",borderRadius:tileBorderRadiusHandPlayerPerspecive}}>
        <SvgXml width="100" height="100" xml={xml} style={{borderRadius:tileBorderRadiusHandPlayerPerspecive}} />
        </View>
        </View>
        </View>
    )
}

const PlayersHandComponent=()=>{
    return(
        <View>
            
        </View>
    )
}

function MahjongScreen({navigation, route}: any) {
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
            <TileComponent/>
        </View>
    )
}
export default MahjongScreen;
