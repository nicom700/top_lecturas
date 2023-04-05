import OroSVG from 'src/assets/medalOro.svg'

export default function Medal({className}){

    const classN = 'flex items-center text-primary hover:text-primaryHover dark:text-primaryDark dark:hover:text-primaryHoverDark' + (className ? ' ' + className : '');

    return (
        <div className={classN}>
            <img src={OroSVG} className="bg-cover block" alt="Top Lecturas" />
        </div>
    );
}