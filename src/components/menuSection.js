export default function MenuSection({ id, items = [] }) {
  // Group items by section
  const sections = items.reduce((acc, item) => {
    const key = item.section || "";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <section id={id} className="menus justify-center">
      <div className="menu-section flex flex-col gap-60 w-100">
{Object.entries(sections).map(([sectionName, sectionItems]) => (
          <div key={sectionName} className="menu-group flex-col gap-20">
            {sectionName && (
              <h3 className="menu-group__title flex galipos capitalize justify-center fade--in" data-sal>{sectionName}</h3>
            )}
            {sectionItems.map((item, i) => (
              <div key={i} className="menu-item fade--in delay-100" data-sal>
                <div className="menu-item__header">
                  <span className="menu-item__name">{item.name}</span>
                  <span className="menu-item__price">{item.price}</span>
                </div>
                {item.description && (
                  <p className="menu-item__description capitalize">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
