import { useRouter } from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link'

import logo from '@img/logo.png';
import '@styles/globals.css'


export default function Header(){
    const router = useRouter();
    
    return(
        <header className='header'>
            <Link href="/"><Image className='logo' src={logo} alt=""/></Link>
            <nav>
                <ul>
                    <li><Link href="/writer">메모장</Link></li>
                    <li>테스트2</li>
                    <li>테스트3</li>
                </ul>
            </nav>
            <button>설정</button>
        </header>
    );
    
}

