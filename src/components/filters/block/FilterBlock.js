// @flow

import React from 'react';
import style from './FilterBlock.module.less';

type FilterBlockProps = {
  title: string,
  children: React.Node[]
}

const FilterBlock = (props: FilterBlockProps) => {
  const {title, children} = props;
  return (
    <div className={style.wrapper}>
      <div className={style.line}/>
      <div className={style.title}>{title}</div>
      {children}
    </div>
  );
};

export default FilterBlock;