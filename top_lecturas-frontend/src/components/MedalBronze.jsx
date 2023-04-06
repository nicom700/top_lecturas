import BronzeSVG from 'src/assets/medalBronze.svg'

export default function Medal({className}){

    const classN = 'flex items-center text-primary hover:text-primaryHover dark:text-primaryDark dark:hover:text-primaryHoverDark' + (className ? ' ' + className : '');

    return (
        <div className={classN}>
            <img src={BronzeSVG} className="bg-cover block " alt="Top Lecturas" />
        </div>
    );
}