import css from "./Categories.module.scss"
const Skeleton = ({title}:{title?: string}) => {
    return (
        <li className={css.Skeleton}>{}</li>
    );
};

export default Skeleton;