import React, { useEffect, useRef, useState } from 'react'
import NavbarDefault from '../components/navbar'
import { 
    Button, 
    Checkbox, 
    Dialog, 
    DialogHeader, 
    DialogBody,
    DialogFooter,
    Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom';

export const Term = ({onAccept}) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [open, setOpen] = React.useState(false);
 
    const handleOpen = () => setOpen(!open);
    const scrollRef = useRef();

    const checkScroll = () => {
        if(scrollRef.current){
            const {scrollTop, scrollHeight, clientHeight} = scrollRef.current;
            setIsScrolled(scrollTop + clientHeight >= scrollHeight); 
        }
    };

    const handleCheckboxChange = (event) => {
        if (isScrolled) {
            setIsChecked(event.target.checked);
        } else {
            event.preventDefault();
        }
    }

    useEffect(() => {
        checkScroll();
    },[]);
    return (
        <>
        <Dialog open={open} handler={handleOpen}>
        <div className='flex flex-col items-center justify-center'>
            <DialogHeader variant='h3' className='mt-20'>Terms and Conditions</DialogHeader>
            <DialogBody className="h-[35rem] overflow-scroll" ref={scrollRef} onScroll={checkScroll}>
            <Typography variant="paragraph">Please read these terms and conditions carefully before using &quot;Web Enterprise&quot; website operated by our group.</Typography>
            <b>Conditions of use</b>
            <Typography variant="paragraph">By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to stop using the website accordingly. Web Enterprise only grants use and access of this website, its products, and its services to those who have accepted its terms.</Typography>
            <b>Privacy policy</b>
            <Typography variant="paragraph">Before you continue using our website, we advise you to read our privacy policy regarding our user data collection. It will help you better understand our practices.</Typography>
            <b>Intellectual property</b>
            <Typography variant="paragraph">You agree that all materials, products, and services provided on this website are the property of Group 4, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and other intellectual property. You also agree that you will not reproduce or redistribute the our group&rsquo;s intellectual property in any way, including electronic, digital, or new trademark registrations.</Typography>
            <b>User accounts</b>
            <Typography variant="paragraph">As a user of this website, you may be asked to register with us and provide private information. You are responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety and security of your identifying information. You are also responsible for all activities that occur under your account or password.</Typography>
            <Typography variant="paragraph">If you think there are any possible issues regarding the security of your account on the website, inform us immediately so we may address them accordingly.</Typography>
            <Typography variant="paragraph">We reserve all rights to terminate accounts, edit or remove content and cancel orders at our sole discretion.</Typography>
            <b>Applicable law</b>
            <Typography variant="paragraph">By using this website, you agree that the laws of the [your location], without regard to principles of conflict laws, will govern these terms and conditions, or any dispute of any sort that might come between our group and you, or its business partners and associates.</Typography>
            <b>Limitation on liability</b>
            <Typography variant="paragraph">Our company is not liable for any damages that may occur to you as a result of your misuse of our website.</Typography>
            <Typography variant="paragraph">Our Company reserves the right to edit, modify, and change this Agreement at any time. We shall let our users know of these changes through electronic mail. This Agreement is an understanding between our group and the user, and this supersedes and replaces all prior agreements regarding the use of this website.</Typography>
            </DialogBody>
            
        <DialogFooter className='w-[768px] flex justify-between mt-5'>
            <Checkbox label="I have read and agree all Terms and Conditions of system" disabled={!isScrolled} onChange={handleCheckboxChange}/>
            <Button color='green' disabled={!isChecked} onClick={onAccept}>Accept</Button>
        </DialogFooter>
        </div>
            </Dialog>   
        </>
    )
}
