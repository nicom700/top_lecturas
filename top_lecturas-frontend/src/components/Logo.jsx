import LogoSVG from 'src/assets/logo.svg';

export default function Logo({className}){

    const classN = 'flex items-center' + (className ? ' ' + className : '');

    return (
        <div className={classN}>
            <img src={LogoSVG} className="bg-cover" alt="Top Lecturas" />
        </div>
    );
}