import React from 'react';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar";

const menuItems = [
    {
        label: "File",
        items: [
            { name: "New Tab", shortcut: "⌘T" },
            { name: "New Window" },
            "separator",
            { name: "Share" },
            "separator",
            { name: "Print" }
        ]
    },
    {
        label: "Edit",
        items: [
            { name: "Undo", shortcut: "⌘Z" },
            { name: "Redo", shortcut: "⌘Y" },
            "separator",
            { name: "Cut", shortcut: "⌘X" },
            { name: "Copy", shortcut: "⌘C" },
            { name: "Paste", shortcut: "⌘V" }
        ]
    }
];

const MenubarIndex = () => {
    return (
        <Menubar className='cust-main-menu-header'>
            {menuItems.map((menu, index) => (
                <MenubarMenu key={index}>
                    <MenubarTrigger className="bg-white">{menu.label}</MenubarTrigger>
                    <MenubarContent>
                        {menu.items.map((item, idx) =>
                            item === "separator" ? (
                                <MenubarSeparator key={idx} />
                            ) : (
                                <MenubarItem key={idx}>
                                    {item.name} {item.shortcut && <MenubarShortcut>{item.shortcut}</MenubarShortcut>}
                                </MenubarItem>
                            )
                        )}
                    </MenubarContent>
                </MenubarMenu>
            ))}
        </Menubar>
    );
};

export default MenubarIndex;