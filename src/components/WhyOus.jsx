import React from 'react'

export default function WhyOus() {
    return (
        <>
            <div className='container container-whyous why-ous pb-5'>
                <h1 className='text-center mb-5 fst-italic'>Why Choose</h1>
                <div className='row '>
                    <div className='card col-md-3 col-10 mx-auto'>
                        <div className="d-flex justify-content-center">
                            <img src="/whyous/1.png" alt="" />
                        </div>
                        <div className='title'>Sustainable Products</div>
                        <p>Explore our carefully curated
                            selection of sustainable products,  each designed to reduce your  carbon footprint</p>
                    </div>
                    <div className=' card col-md-3 col-10 mx-auto'>
                        <div className="d-flex justify-content-center">
                            <img src="/whyous/2.png" alt="" />
                        </div>
                        <div className='title'>Eco-Friendly Choices</div>
                        <p>
                            Make conscious choices with our eco friendly products, knowing  that your purchases promote ethical sourcing and responsible manufacturing practices.
                        </p>
                    </div>
                    <div className='card col-md-3 col-10 mx-auto'>
                        <div className="d-flex justify-content-center">
                            <img src="/whyous/3.png" alt="" />
                        </div>
                        <div className='title'>High-Quality Selection</div>
                        <p>Invest in long-lasting and reliable
                            products that meet our stringent
                            quality standards, ensuring your
                            satisfaction and the longevity of
                            your purchases.</p>
                    </div>
                    <div className='card col-md-3 col-10 mx-auto'>
                        <div className="d-flex justify-content-center">
                            <img src="/whyous/4.png" alt="" />
                        </div>
                        <div className='title'>Sustainable Packaging</div>
                        <p>Our sustainable packaging ensures
                            that your orders arrive safely
                            while minimizing their impact on
                            the planet.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
