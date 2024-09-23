import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ConfirmDialog = (props) => {
	const { item, open, handleConfirmation } = props;

	return (
		<Dialog
			open={open}
			onClose={() => handleConfirmation(item)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{"Confirm delete!"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Do you want to continue delete this item?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleConfirmation(item)}>Cancel</Button>
				<Button
					onClick={() => handleConfirmation(item, true)}
					variant="contained"
					color="info"
				>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;
