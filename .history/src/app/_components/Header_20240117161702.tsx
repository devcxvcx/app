import Image from 'next/image';
import logo from '@img/logo.png';
import '@styles/globals.css'


export default function Header(){
    
    return(
        <header className='header'>
            <a href='' className='logo'><Image src={logo} alt=""/></a>
            <nav>
                <ul>
                    <li>테스트1</li>
                </ul>
            </nav>
        </header>
    );
    
}

