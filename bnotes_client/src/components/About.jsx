
import { useState, useEffect } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"

import Header from "./Header"

import Github from '../assets/github-mark.svg'
import Linkedin from '../assets/linkedin-icon-2.svg'

export default function About(){

  const data = useOutletContext()
  const [ userData, setUserData ] = data

  const navigate = useNavigate()

  const [headerRender, setHeaderRender] = useState(false)

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('data')) ) {
      setHeaderRender(true)
    }
  }, [])


  return(
    <>
      {!headerRender ?
      <header id="unlogged_header">
        <div>
          <h1 id='unlogged_title'>b_notes</h1>
          <article className="go_back" onClick={() => navigate('/')}>
            <p>Go Back</p>
          </article>
        </div>
      </header>
      :
        <Header userData={userData} setUserData={setUserData} />
      }
      <div className="wrapper">
      <section className="about_section">
        <h3>About b_notes</h3>
        <article className="elevator-pitch">
          <p className="paragraph">The <span className="bold">b_notes</span> app was created by Antonio Climent Encinas, as a final project for the General Assembly Software Engineering Immersive Bootcamp.</p>
          <p className="paragraph">As the creator, when planning what should I do; I asked myself for something, no matter how small, that might be useful either for me or someone I know. I am a very serious book reader, and a lot of people around me are as well; some like to take notes on the pages of the books themselves, some don't for varied reasons, commonly including not wanting to ruin a book.</p>
          <p className="paragraph">For whomever wants to take notes about a book, and not on the book itself, <span className="bold">b_notes</span> is for you! <span className="bold">b_notes</span> finds books by Author or Title, which you can add to libraries you own and manage, and then, take notes about them!</p>
          <p className="paragraph">If you are interested in <span className="bold">b_notes</span> as a service, feel free to use it to your heart's content! If you are more interested in the tech side of things, or in me as a developer, you can check the links below!</p>
        </article>
        <div className="about_logos">
          <img src={Github} alt="Github Logo" />
          <img src={Linkedin} alt="LinkedIn Logo" />
        </div>
        {/* add texts + links to Linkedin and github */}
      </section>
      </div>
    </>
  )
}