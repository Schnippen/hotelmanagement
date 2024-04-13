import { Image, Text } from "@rneui/themed"
import React from "react"
import { View } from "react-native"
import { mahjongTilesSVGsArray } from "./MahjongTiles/MahjongTiles" 
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

//SCREEN COMPOSITION
// bottom ROW - player hand
//player hand buttons timer tile to take , 

//PERSPECTIVe in richii city from bottom up
//padding to hand 5px
//player tile height 159px 
//from top of tile to bottom of wall 27px
//wall height - two tiles 74px - one tile 58px
//from top of player hand to the bottom compass 344px
//compass dimensions bottom perimeter 323 px/ top perimeter 305px/ height all 208px


//Colors
//Tile Front: e9ebe8
//tile shadow: bdbbc0
//tile back: 56a2c4

//types of styling
//-on hand NESW
//-on wall NESW
//-on sidetabke NESW
//-on River NESW

const TileComponent =({svg,tileRatioProp=3}:{svg:string,tileRatioProp:number})=>{
    //console.log(svg.length)
    const tileRatio = tileRatioProp;
    const tileWidth = +(30 * tileRatio).toFixed(2); // default 30 x 3
    const tileHeight = +(39 * tileRatio).toFixed(2); // default 39 x 3
    const tileDepth = +(7.66 * tileRatio).toFixed(2); // default 23 // not taking perspective into account
    const tileImageWidth = +(33.3 * tileRatio).toFixed(2); // default 100
    const tileImageHeight = +(33.3 * tileRatio).toFixed(2); // default 100
    const tileSecondLayer = +(tileHeight + (tileDepth * 0.695)).toFixed(2); // 69.5% of tile depth added to tile height
    const tileBottomLayer = +(tileHeight + tileDepth).toFixed(2);
    const tileBorderRadiusHandPlayerPerspective = 8;
//ramka 5 px - szare 13   = 18 +1 = 19+2=21
//sare ma padding 1 z lewej i prawej, kontur ma grubość 2 //TODO create perspective that is scalable
    return(
        <View style={{backgroundColor:'#56a2c4',height:tileBottomLayer,width:tileWidth,justifyContent:"flex-end",borderRadius:tileBorderRadiusHandPlayerPerspective,borderWidth:1}}>
        <View style={{backgroundColor:"#bdbbc0",height:tileSecondLayer,width:tileWidth-2,justifyContent:"flex-end",borderRadius:tileBorderRadiusHandPlayerPerspective,alignItems:"center"}}>
        <View style={{backgroundColor:"#e9ebe8", height:tileHeight,width:tileWidth-2,alignItems:"center",justifyContent:"center",borderRadius:tileBorderRadiusHandPlayerPerspective}}>
        <SvgXml width={tileImageWidth} height={tileImageHeight} xml={svg} style={{borderRadius:tileBorderRadiusHandPlayerPerspective}} />
        </View>
        </View>
        </View>
    )
}

const PlayersHandComponent=()=>{
    const hand=mahjongTilesSVGsArray.slice(14,16).map((item,index)=><TileComponent svg={item} tileRatioProp={2} key={index+index}/>)
    console.log("hand:",mahjongTilesSVGsArray[16])

    return(
        <View style={{flexDirection:"row",backgroundColor:"lightblue",width:"100%"}}>
    {hand}       
    </View>
    )
}

const Compass = () => {
    //measuring from screenshot as a scale of reference
    const compassBottomPerimeter = 320
    const compassTilesCounterBottomPerimeter=+(100 * 1.0188).toFixed(2)
    const compassTurnIndicatorBottomPerimeter=200
    const CompassTileCounter=()=>{//317  /100 //center piece
        return(
            <View style={{backgroundColor:"pink",width:compassTilesCounterBottomPerimeter,height:compassTilesCounterBottomPerimeter,justifyContent:"space-around",}}>
                <Text>EAST 3</Text>
                <Text style={{backgroundColor:"lightblue",height:36}}>TILES LEFT</Text>
            </View>
        )
    }
    const CompassTurnIndicator=()=>{
        return(
            <View style={{width:compassTurnIndicatorBottomPerimeter,height:40,backgroundColor:"orange",}}>
                <View style={{backgroundColor:"lime", height:10,}}></View>
                <View style={{width:85,height:20,backgroundColor:"gray"}}>
                <Text>SCORE</Text>
                </View>
            </View>
        )
    }
    const CompassRichiiIndicator=()=>{
        return(
            <View style={{width:200,height:30,justifyContent:"center",backgroundColor:"gray",alignItems:'center',}}>
                <View style={{backgroundColor:"black",height:20,width:150,borderRadius:20}}></View>
            </View>
        )
    }
    const CompassWindIndicator=()=>{
        const Triangle=()=>{return(
            <View style={ {
                width: 0,
                height: 0,
                borderLeftWidth: 37,
                borderRightWidth: 0,
                borderBottomWidth: 0,
                borderTopWidth:25,
                borderStyle: 'solid',
                backgroundColor: 'transparent',
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: '#606070',
                borderTopColor: '#606070',
              position:"absolute",top:0,right:0
              }}></View>
        )}
        return(//65 45
            <View style={{borderBottomLeftRadius:8,width:65,height:60,backgroundColor:"green",position:"absolute",bottom:0,left:0}}>
                <Triangle/>
            </View>
        )
    }
    const PlayerSide=({degrees=0,bottomPosition=0,topPosition=0,leftPosition=0,rightPosition=0}:{degrees:number,bottomPosition:number,topPosition:number,leftPosition:number,rightPosition:number})=>{
        //TODO to 125 to have perspecive
        //const degrees=0
        return(
        <View style={{backgroundColor:"transparent",flexDirection:"row",height:70,justifyContent:"center",width:compassBottomPerimeter,transform: [{rotate: `${degrees}deg`}],position:"absolute",top:rightPosition,left:leftPosition,right:rightPosition,bottom:bottomPosition}}>
        <CompassWindIndicator/>
            <View style={{flexDirection:"column"}}>
            <CompassTurnIndicator/>
            <CompassRichiiIndicator/>
            </View>
        </View>
        )
    }
    //        <CompassTileCounter/> 
    //transform: [{rotateX: '45deg'}]
    return (
      <View style={{
        backgroundColor:"red",
        width: compassBottomPerimeter,  //
        height:compassBottomPerimeter, //padding 8   8 45
        position:"relative",
        justifyContent:"center",
        alignItems:"center"
      }} >
        <CompassTileCounter/> 
        <PlayerSide degrees={0} leftPosition={0} rightPosition={250} bottomPosition={0}  topPosition={0}/> 
        <PlayerSide degrees={90} leftPosition={-125} rightPosition={125} bottomPosition={0}  topPosition={0}/> 
        <PlayerSide degrees={180} leftPosition={0} rightPosition={0} bottomPosition={0}  topPosition={0}/>
        <PlayerSide degrees={270} leftPosition={125} rightPosition={125} bottomPosition={0}  topPosition={0}/> 
        </View>
    );
  };

function MahjongScreen({navigation, route}: any) {
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
{/*<PlayersHandComponent/>*/}
            <Compass/>
        </View>
    )
}
export default MahjongScreen;
