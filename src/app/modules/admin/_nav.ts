import { StepRoute } from "@shared/services/stepper.service";
import { UsersComponent } from "./pages/users/users.component";

interface NavAttributes {
    [propName: string]: any;
}
interface NavWrapper {
    attributes: NavAttributes;
    element: string;
}
interface NavBadge {
    text: string;
    variant: string;
}
interface NavLabel {
    class?: string;
    variant: string;
}

export interface NavData {
    name?: string;
    url?: string;
    icon?: string;
    badge?: NavBadge;
    title?: boolean;
    children?: NavData[];
    variant?: string;
    attributes?: NavAttributes;
    divider?: boolean;
    class?: string;
    label?: NavLabel;
    wrapper?: NavWrapper;
}

export const navItems: StepRoute[] = [
    {
        title: 'Dashboard',
        component: UsersComponent,
    },
    {
        title: 'Users',
        component: UsersComponent,
    }
]