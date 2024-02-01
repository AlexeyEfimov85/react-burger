import { FC, ReactNode } from "react";
import styles from './article.module.css';

type ArticleProps = {
  text: string;
  children: ReactNode
}

const Article: FC<ArticleProps> = ({ text, children }) => {
  return (
    <article className={styles.article}>
      <p className="text text_type_main-medium">{text}</p>
      {children}
    </article>
  );
}

export default Article;
