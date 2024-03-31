import React, { useEffect, useRef, useState } from 'react'
import NavbarDefault from '../components/navbar'
import { Button, Checkbox, Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom';

export const Term = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const scrollRef = useRef();

    const checkScroll = () => {
        if(scrollRef.current){
            const {scrollTop, scrollHeight, clientHeight} = scrollRef.current;
            setIsScrolled(scrollTop + clientHeight >= scrollHeight); 
        }
    };

    const handleCheckboxChange = (event) =>{
        setIsChecked(event.target.checked);
    }

    useEffect(() => {
        checkScroll();
    },[]);
    return (
        <>
        <form>
        <NavbarDefault/>
        <div className='flex flex-col items-center justify-center'>
            <Typography variant='h3' className='mt-20'>Terms and Conditions</Typography>
            <div className='w-[768px] mt-5 border overflow-auto max-h-[500px]' ref={scrollRef} onScroll={checkScroll}>
            <p>Please read these terms and conditions carefully before using &quot;Web Enterprise&quot; website operated by our group.</p>
            <b>Conditions of use</b>
            <p>By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to stop using the website accordingly. Web Enterprise only grants use and access of this website, its products, and its services to those who have accepted its terms.</p>
            <b>Privacy policy</b>
            <p>Before you continue using our website, we advise you to read our privacy policy regarding our user data collection. It will help you better understand our practices.</p>
            <b>Intellectual property</b>
            <p>You agree that all materials, products, and services provided on this website are the property of Group 4, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and other intellectual property. You also agree that you will not reproduce or redistribute the our group&rsquo;s intellectual property in any way, including electronic, digital, or new trademark registrations.</p>
            <b>User accounts</b>
            <p>As a user of this website, you may be asked to register with us and provide private information. You are responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety and security of your identifying information. You are also responsible for all activities that occur under your account or password.</p>
            <p>If you think there are any possible issues regarding the security of your account on the website, inform us immediately so we may address them accordingly.</p>
            <p>We reserve all rights to terminate accounts, edit or remove content and cancel orders at our sole discretion.</p>
            <b>Applicable law</b>
            <p>By using this website, you agree that the laws of the [your location], without regard to principles of conflict laws, will govern these terms and conditions, or any dispute of any sort that might come between our group and you, or its business partners and associates.</p>
            <b>Limitation on liability</b>
            <p>Our company is not liable for any damages that may occur to you as a result of your misuse of our website.</p>
            <p>Our Company reserves the right to edit, modify, and change this Agreement at any time. We shall let our users know of these changes through electronic mail. This Agreement is an understanding between our group and the user, and this supersedes and replaces all prior agreements regarding the use of this website.</p>
            </div>
            
        <div className='w-[768px] flex justify-between mt-5'>
            <Checkbox label="I have read and agree all Terms and Conditions of system" disabled={!isScrolled} onChange={handleCheckboxChange}/>
            <Link to="/login"><Button color='green' disabled={!isChecked}>Accept</Button></Link>
        </div>
        </div>
            </form>   
        </>
    )
}
