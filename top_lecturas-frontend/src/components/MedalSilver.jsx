import SilverSVG from 'src/assets/medalSilver.svg'

export default function MedalSilver({className}){

    const classN = 'flex items-center text-primary hover:text-primaryHover dark:text-primaryDark dark:hover:text-primaryHoverDark' + (className ? ' ' + className : '');

    return (
        <div className={classN}>
            <img src={SilverSVG} className="bg-cover block" alt="Top Lecturas" />
        </div>
    );
}