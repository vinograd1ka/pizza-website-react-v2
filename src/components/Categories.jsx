const Categories = ({categories, onChangeActiveCategory, activeCategory}) => {
    return (
        <div>
            <div className="categories">
                <ul>
                    {categories.map((name, index) =>
                        <li
                            key={index}
                            onClick={() => onChangeActiveCategory(index)}
                            className={activeCategory === index ? 'active' : ''}>
                            {name}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Categories;

