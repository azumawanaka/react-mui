import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";

const Header = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const router = useRouter();
	const theme = useTheme();

	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleNavigation = (path) => {
		router.push(path);
		handleMenuClose();
	};

	return (
		<AppBar position="static">
			<Toolbar>
				{isMobile && (
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={handleMenuClick}
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
				)}

				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					{" "}
					MyApp{" "}
				</Typography>

				{isDesktop && (
					<div>
						<Button
							color="inherit"
							onClick={() => handleNavigation("/")}
						>
							Home
						</Button>
						<Button
							color="inherit"
							onClick={() => handleNavigation("/games")}
						>
							Games
						</Button>
						<Button
							color="inherit"
							onClick={() => handleNavigation("/about")}
						>
							Infinite scroll effect
						</Button>
					</div>
				)}
			</Toolbar>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				open={open}
				onClose={handleMenuClose}
			>
				<MenuItem onClick={() => handleNavigation("/")}>Home</MenuItem>
				<MenuItem onClick={() => handleNavigation("/about")}>
					About
				</MenuItem>
				<MenuItem onClick={() => handleNavigation("/contact")}>
					Contact
				</MenuItem>
			</Menu>
		</AppBar>
	);
};

export default Header;
