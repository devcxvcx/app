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
                    <li>테스트2</li>
                    <li>테스트3</li>
                </ul>
            </nav>
            <button>설정</button>
        </header>
    );
    
}

