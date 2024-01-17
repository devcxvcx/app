import Image from 'next/image';
import logo from '@img/logo.png';

export default function Header(){
    
    return(
        <header>
            <a href=''>
            <Image
            src={logo}
            alt=""
            width={50}
            height={50}
            />
            </a>
            <nav>
                nav
            </nav>
        </header>
    );
    
}

