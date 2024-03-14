import React from 'react'
import { View } from 'react-native'

const Dot=({status}:{status:string})=>{
    const isStatus=status?status:""
    const statusToLowerCase = isStatus.toLowerCase()
    const statusColor=statusToLowerCase==="available"?"green":statusToLowerCase==="occupied"
    ?"red":statusToLowerCase==="under maintenance"?"orange":"gray"
    return(
      <View style={{height:15,width:15,backgroundColor:`${statusColor}`,  borderRadius: 100,}}></View>
    )
  }
export default Dot
