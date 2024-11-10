import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

export default function Footer() {
    return (
        <div className='container footer'>
            <div className='row'>
                <div className='col-md-6'>
                    <img src="/logo.png" alt="Logo Eco Shop" className='logo' />
                    <p className='mt-3'>
                        Eco Shop is your trusted destination for premium, eco-friendly products.
                        We're committed to delivering a holistic approach to wellness,
                        harnessing nature's power to support a healthier, more sustainable lifestyle.
                    </p>
                    <div className='pb-5'>
                        <img src="/sosmed/fb.svg" alt="icon facebook" className='me-3' />
                        <img src="/sosmed/linkedin.svg" alt="icon linkedin" className='me-3' />
                        <img src="/sosmed/instagram.svg" alt="icon instagram" className='me-3' />
                        <img src="/sosmed/twitter.svg" alt="icon twitter" className='me-3' />
                        <img src="/sosmed/youtube.svg" alt="icon youtube" className='me-3' />
                    </div>
                </div>
                <div className='col-md-6'>
                    <p className='fw-bold'>Receive offers & discounts via e-mail</p>

                </div>
            </div>
        </div>
    )
}
