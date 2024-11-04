import React from 'react'
import "./footer.css"

const Footer = () => {
    return (
        <div class="footer_container" id="contactus">
            <div class="joinus_container">

                <div class="comfort_container">
                    <h1 class="quote_footer">
                        We always try to step <br />
                        outside our comfort zone. <br />
                        That’s part of the reason <br />
                        we got here.
                    </h1>
                    {/* <p class="branding_video_para">Learn more about our Culture</p> */}
                </div>

                <h1 class="awards_heading">
                    Join with us ⟿</h1>
            </div>

            <div class="details_container">

                <div class="">
                    <p class="branding_footer_para">SVCET <br />

                        RVS 517127 <br />
                        Chittoor,AP</p>
                    <p class="branding_footer_para_dark">

                        Call <br />
                        +91 8309791865
                    </p>
                    <a href="https://maps.app.goo.gl/DeUeCZ1G9kXKZgZu9" target="_blank" class="branding_footer_para_dark">

                        GPS <br />
                        N 13°16'27.9" <br />
                        E 79°07'11.5"


                    </a>

                </div>

                <div class="">
                    <p class="branding_footer_para">
                        Developers </p>

                    <p class="branding_footer_para_dark">
                        Murali Krishna Abbugondi
                    </p>

                    <p class="branding_footer_para_dark">
                        Roshan Sammer
                    </p>
                </div>

                <div class="">
                    <p class="branding_footer_para">
                        Contact Us
                        <br />
                        Share Your Thoughts
                    </p>

                    <p class="branding_footer_para_dark">

                        muralikrishna8309@gmail.com
                        <br />
                        LinkedIn
                        <br />
                        Whats app

                    </p>
                    <p class="branding_footer_para_dark">
                        ⇢ Let's Talk!

                    </p>
                </div>

            </div>


        </div>

    )
}

export default Footer
