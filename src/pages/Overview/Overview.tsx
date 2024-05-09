import React from 'react'
import Image from '../../assets/doctorWithLap.jpg'
import Playbutton from '../../assets/playButton.svg'

const Overview = () => {
  return (
    <>
        <div style={{padding:'0 30px'}}>
            <h1 style={{textAlign:'start',marginBottom:'50px'}}>About Us</h1>

            <h1 style={{textAlign:'start'}}>How it's Work ?</h1>

            <div style={{position:'relative'}}>
                <img style={{width:'800px',height:'400px',borderRadius:'20px',display:'flex'}} src={Image} alt="" />
                <img style={{width:'100px',height:'100px',position:'absolute',top:'35%',right:'60%'}} src={Playbutton} alt="" />
            </div>
            <h1 style={{textAlign:'start'}}>Contact Us</h1>
        </div>
    </>
  )
}

export default Overview