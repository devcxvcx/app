import Image from 'next/image';
import logo from '@img/logo.png';

export default function Header(){
    
    return(
        <header>
            <a href='' className='logo'>
                <Image src={logo} alt=""/>
            </a>
            <nav>
                nav
            </nav>
        </header>
    );
    
}

