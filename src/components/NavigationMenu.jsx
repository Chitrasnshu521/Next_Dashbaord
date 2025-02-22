import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from "@/components/ui/navigation-menu";
  
  const menuItems = [
    { title: "Item One", link: "#" },
    { title: "Item Two", link: "#" },
   
  ];
  
  const Navigation = () => {
    return (
      <NavigationMenu className='ms-5 pt-2'>
        <NavigationMenuList>
          {menuItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
              <NavigationMenuContent className="pe-3 ps-3">
                <NavigationMenuLink href={item.link} >{item.title} Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    );
  };
  
  export default Navigation;
  