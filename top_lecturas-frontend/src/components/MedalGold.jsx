import GoldSVG from 'src/assets/medalGold.svg'

export default function MedalGold({className}){

    const classN = 'flex items-center text-primary hover:text-primaryHover dark:text-primaryDark dark:hover:text-primaryHoverDark' + (className ? ' ' + className : '');

    return (
        <div className={classN}>
            <img src={GoldSVG} className="bg-cover block" alt="Top Lecturas" />
        </div>
    );
}