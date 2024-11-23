import styles from './loader.module.css';

export const Loader = ({ type = 'loader' }) => {
	return <div className={styles[`${type}`]}></div>;
};
