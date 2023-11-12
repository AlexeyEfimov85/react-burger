import PropTypes from "prop-types";
import styles from './article.module.css';
export default function Article(props) {
    return (
      <article className={styles.article}>
        <p className="text text_type_main-medium">{props.text}</p>
        {props.children}
      </article>
    );
  }
  
  Article.propTypes = {
    text: PropTypes.string,
    children: PropTypes.any,
  };