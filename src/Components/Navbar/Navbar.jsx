import React from 'react'
import img1  from '../../Image/shopping-cart-01.png'
import img2  from '../../Image/file-view.png'


export default function Navbar() {
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container navbarWidth">

                  <a className="navbar-brand" href="#">Projects Materials</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>


                  <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0 m-auto">
                          <li className="nav-item">
                              <a className="nav-link" href="#">Home</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link" href="#">Add</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link" href="#">Looking for</a>
                          </li>
                      </ul>
                  </div>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0  m-auto">
                          <li className="nav-item  ">
                              <img src={img1} alt='img'/>
                          </li>
                          <li className="nav-item ms-3">
                              <img src={img2} alt='img' />
                          </li>
                      </ul>
                  </div>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0  m-auto">
                          <li className="nav-item">
                              <button className='btn navBtnLogin'>Log in</button>
                          </li>
                          <li>
                              <button className='btn navBtnsignup'>sign up</button>
                          </li>
                      </ul>
                  </div>
              </div>
        </nav>
    
    </>
  )
}
