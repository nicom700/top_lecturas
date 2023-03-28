import LogoSVG from 'src/assets/logo.svg';
import LogoSVGDark from 'src/assets/logoDark.svg';

export default function Logo({className}){

    const classN = 'flex items-center text-primary hover:text-primaryHover dark:text-primaryDark dark:hover:text-primaryHoverDark' + (className ? ' ' + className : '');

    return (
        <div className={classN}>
            <img src={LogoSVG} className="bg-cover block dark:hidden" alt="Top Lecturas" />
            <img src={LogoSVGDark} className="bg-cover dark:block hidden" alt="Top Lecturas" />
        </div>
    );
}