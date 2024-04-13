import { Image, Text } from "@rneui/themed"
import React from "react"
import { ScrollView, View } from "react-native"
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
    const compassBottomPerimeter = 320 //320-200=120 
    const compassTilesCounterBottomPerimeter=+(100 * 1.0188).toFixed(2)
    const compassTurnIndicatorBottomPerimeter=200
    const backgroundColor= "#5a5a66"
    const backgroundColorSec="#2f2f39"
    const CompassTileCounter=()=>{//317  /100 //center piece
        return(
            
            <View style={{backgroundColor:"#1d1d1f",width:compassTilesCounterBottomPerimeter,height:compassTilesCounterBottomPerimeter,alignItems:"center",borderBottomWidth:1,borderBottomColor:"#1b2a2d"}}>
                <Text style={{flex:1,fontSize:22,textAlign:"center",width:"100%",textAlignVertical:"center",color:"#4affff"}}>EAST 3</Text>
                <Text style={{backgroundColor:"lightblue",flex:1,fontSize:40,width:"100%",textAlign:"center",color:"#4affff"}}>69</Text>
            </View>
        )
    }
    const CompassTurnIndicator=()=>{
        const TriangleRight=()=>{return(
            <View style={ {
                width: 0,
                height: 0,
                borderLeftWidth: 0,
                borderRightWidth: 50,
                borderBottomWidth: 40,
                borderTopWidth:0,
                borderStyle: 'solid',
                backgroundColor: 'transparent',
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: "lime",
                borderTopColor: "lime",
              position:"absolute",top:0,right:0
              }}></View>
        )}
        const TriangleLeft=()=>{return(
            <View style={ {
                width: 0,
                height: 0,
                borderLeftWidth: 50,
                borderRightWidth: 0,
                borderBottomWidth: 40,
                borderTopWidth:0,
                borderStyle: 'solid',
                backgroundColor: 'transparent',
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: "lime",
                borderTopColor: "lime",
              position:"absolute",top:0,left:0
              }}></View>
        )}
        const containerWidth=200
        return(
            <View style={{width:200,height:40,backgroundColor:"transparent",position:"relative",justifyContent:"flex-end"}}>
                
                        <View style={{height:70,width:containerWidth,backgroundColor:"transparent",bottom:0,position:'absolute'}}>
                            <View style={{width:containerWidth,position:'relative'}}>
                            <View style={{position:"absolute",height:40,width:100,backgroundColor:"lime", top:0,left:50}}/>
                            <TriangleRight/>
                            <TriangleLeft/>
                            </View>

                        </View> 
                        <View style={{backgroundColor:"#39383d",height:30}}>
                            <Text style={{fontSize:20,color:"#ffdb51",textAlignVertical:"center",textAlign:"center"}}>25000</Text>
                        </View>
            </View>
        )
    }
    const CompassRichiiIndicator=()=>{
        return(
            <View style={{width:200,height:30,justifyContent:"center",backgroundColor:"#5d5d69",alignItems:'center',}}>
                <View style={{backgroundColor:"black",height:20,width:150,borderRadius:20}}></View>
            </View>
        )
    }
    const CompassWindIndicator=()=>{
        const Triangle=()=>{return(
            <View style={ {
                width: 0,
                height: 0,
                borderLeftWidth: 30,
                borderRightWidth: 0,
                borderBottomWidth: 0,
                borderTopWidth:30,
                borderStyle: 'solid',
                backgroundColor: 'transparent',
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: "#39383d",
                borderTopColor: "#39383d",
              position:"absolute",top:0,right:0
              }}></View>
        )}
        //16=south
        //17=north
        //28=west
        //39=east #bc2f38
        let index =28
        let defaultWindBackground="beige"
        let currentWindBackground=index===39?"#bc2f38":defaultWindBackground
        return(//65 45 
            <View style={{borderBottomLeftRadius:8,width:60,height:60,backgroundColor:currentWindBackground,position:"absolute",bottom:0,left:0,justifyContent:"flex-end",alignItems:'flex-start'}}>
                <Triangle/>
                <SvgXml width={50} height={50} xml={mahjongTilesSVGsArray[index]} style={{marginLeft:2,marginBottom:2}} />
            </View>
        )
    }
    const PlayerSide=({degrees=0,bottomPosition=0,topPosition=0,leftPosition=0,rightPosition=0}:{degrees:number,bottomPosition:number,topPosition:number,leftPosition:number,rightPosition:number})=>{
        //TODO to 125 to have perspecive
        //const degrees=0
        return(
        <View style={{backgroundColor:"transparent",flexDirection:"row",height:70,justifyContent:"center",width:compassBottomPerimeter,transform: [{rotate: `${degrees}deg`}],position:"absolute",top:rightPosition,left:leftPosition,right:rightPosition,bottom:bottomPosition}}>
        <CompassWindIndicator/>
            <View style={{flexDirection:"column",height:70,backgroundColor:"transparent"}}>
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
        backgroundColor:"#39383d",
        width: compassBottomPerimeter,  //
        height:compassBottomPerimeter, //padding 8   8 45
        position:"relative",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:8,
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
        <ScrollView style={{flex:1}}>
            <View style={{borderBottomWidth:8,borderRadius:8, transform: [{rotateX: '45deg'}, {rotateZ: '0deg'},{scale:0.8}],backgroundColor:"#5d5d69",width:320}}>
            <Compass/>
            </View>
            <PlayersHandComponent/>

        </ScrollView>
    )
}
export default MahjongScreen;
