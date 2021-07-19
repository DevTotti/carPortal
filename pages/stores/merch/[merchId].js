import React, { useEffect, useContext, useState } from 'react'
import styles from '../../../styles/Merch.module.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import { TiShoppingCart } from "react-icons/ti"
import { cartContext } from '../../../utils/CartContext'
import Cart from '../../../components/Cart';
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid';
import { getNumberWithCommas } from '../../../utils/functions'
import { RiTruckLine } from 'react-icons/ri'
import { CgTimer } from 'react-icons/cg'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'


function SingleMerch({item}) {

    const router = useRouter()
    const { merchId } = router.query

    const [cart, setCart] = useContext(cartContext)
    const [showCart, setShowCart] = useState(false)
    const [size, setSize] = useState(item.merch_size)
    const [user, setUser] = useState()


    // useEffect(() => {
    //     const cartState = setInterval(() => {
    //        const currentCart = JSON.parse(localStorage.getItem('carPortalCart'))
    //        let cartContained = currentCart.length > 1 ? true : false
    //        setInCart(cartContained)
    //         return () => {
    //             clearInterval(cartState)
    //         }
    //     }, 5000);
    // }, [])

    
    const addToCart = () => {
        // let currentCart = JSON.parse(localStorage.getItem('carPortalCart')) ? JSON.parse(localStorage.getItem('carPortalCart')) : []
        const newCart = [...cart, 
            {
             img: item.images[0],
             stock: item.stock,
             id: uuidv4(),
             name: item.name,
             price: item.new_price,
             qty: 1,
             size
            }
        ]
        // localStorage.setItem('carPortalCart', JSON.stringify(newCart))
        setCart(newCart)
    }

    const hideShow = () => {
        setShowCart(false)
      }
      useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('carPortalUser'))
        const userName = userInfo.username
        setUser(userName)
      }, [])

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 6000,
        slidesToShow: 1,
        arrows: false,
        dotsClass: "button__dot",
        className: 'slides'
    }

    
    // useEffect(() => {
    //     localStorage.getItem('storeData')

    //     console.log(data);
    // }, [])

    // useEffect(() => {
    //     console.log(cart);
    // }, [cart])
    if (!item) {
        return <p>Loading...</p>
    }

    return (
        <>
        <Head>
        <title>CarPotal | Merch</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
<main className={styles.merch_container}>
       {showCart && <Cart hideShow={hideShow}/>}
        <div className={styles.cart_container}>
        {cart.length > 0 && <div className="cart_content"></div>}
        <p>{user}</p>
            <TiShoppingCart className='cart_icon' onClick={()=>setShowCart(true)} style={{cursor: "pointer", color: 'white'}}/>
        </div>
        <div className={styles.main_section}>
            <div className={styles.main_info}>
                <div className={styles.img_container}>
                    <Slider {...settings}>
                        {
                            item.images.map((img, i) => {
                                return(
                                    <img src={img} alt={img} key={i}/>
                                )
                            })
                        }
                    </Slider>
                </div>
                <div className={styles.section_text}>
                    <h4 className={styles.section_head}>{item.name}</h4>
                    <div className={styles.section_price}>
                        <p className={styles.actual_price}>{'\u20A6'}{getNumberWithCommas(item.new_price)}</p>
                        <div className={styles.price_variation}>
                            <p>{'\u20A6'}{getNumberWithCommas(item.old_price)}</p>
                            <div className={styles.perc}>{item.discount}</div>
                        </div>
                        <div className={styles.variations}>
                        <p>Color Variation: {item.color_variation}</p>
                        <span className="sizes">
                                <p className={`${size == 'SM' ? 'active_size' : ''}`} onClick={() => setSize('SM')}>SM</p>
                                <p className={`${size == 'M' ? 'active_size' : ''}`} onClick={() => setSize('M')}>M</p>
                                <p className={`${size == 'L' ? 'active_size' : ''}`} onClick={() => setSize('L')}>L</p>
                                <p className={`${size == 'XL' ? 'active_size' : ''}`} onClick={() => setSize('XL')}>XL</p>
                            </span>
                        </div>
                    </div>
                    <button className={styles.cart_btn} onClick={addToCart}>Add To Cart</button>
                </div>
            </div>
            <div className={styles.desc}>
                <h4>
                    Description: 
                </h4>
                <p>
                {item.description}
                </p>
            </div>
        </div>
        <div className={styles.billing_info}>
            <h4 className={styles.headline}>Delivery Info</h4>
            <p className={styles.billing_text}>
                Coming Soon!!!
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Unde vel aspernatur odit quis corrupti perferendis. 
                Sequi expedita magni atque error? */}
            </p>
            <div className={styles.delivery_locale}>
                <h2>Available Location</h2>
                <ul>
                    <li className={styles.active}>Lagos</li>
                    {/* <li className={item.location === 'Ife' ? styles.active : styles.inactive}>Ife</li>
                    <li className={item.location === 'Ibadan' ? styles.active : styles.inactive}>Ibadan</li> */}
                </ul>
            </div>
            <div className={styles.time_policy}>
                {/* <img src="" alt="" /> */}
                <RiTruckLine style={{width: '80px', height: '80px'}}/>
                {/* <p><span>Time Duration: </span>Lorem ipsum dolor sit amet, consectetur adipisicing.</p> */}
            </div>
            <div className={styles.return_policy}>
                <CgTimer style={{width: '80px', height: '80px'}}/>
                {/* <p><span>Return Policy: </span>Lorem ipsum dolor sit amet, consectetur adipisicing.</p> */}
            </div>
        </div>
    </main>
    </>
    )
}


export default SingleMerch

 export const getServerSideProps = async ({req, params}) =>{

    try {
            const token = req?.cookies.carToken;
            const id = params.merchId
            let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            };
            let response = await fetch(
                `http://thecarportal.herokuapp.com/store/merch/${id}`,
            config
            );
            let item = await response.json();
            return {
                props: {
                    item: item.message
                }
            }
    } catch (error) {
        return {
            redirect: {
                destination: '/ErrorPage',
                permanent: false,
            }
        };
    }
}
