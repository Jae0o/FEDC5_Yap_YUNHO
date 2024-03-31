import * as S from "./CategoryBar.Styles"
import * as GS from "@/components/CategoryList/CategoryList.Styles"

import React from "react"

import useCategoryList from "@/hooks/useCategoryList"

import { CategoryBarProps } from "./CategoryBar.Types"

const CategoryBar = ({
  selectedCategory,
  onSelected,
}: CategoryBarProps): React.ReactNode => {
  const categoryList = useCategoryList()

  return (
    <S.CategoryBarLayout>
      <GS.CategoryBarList>
        {categoryList &&
          categoryList.map((category) => (
            <GS.CategoryBarListItem
              key={category.id}
              $isSelect={selectedCategory.id === category.id}
              onClick={() => onSelected(category)}
            >
              <p>{category.name}</p>
            </GS.CategoryBarListItem>
          ))}
      </GS.CategoryBarList>
    </S.CategoryBarLayout>
  )
}

export default CategoryBar
