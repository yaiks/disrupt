let users = {
	1: {
		id: "1",
		name: "Ricardo",
		lastName: "Han",
		productIds: [1, 2]
	},
	2: {
		id: "2",
		name: "Stella",
		lastName: "Kim",
		productIds: [3]
	}
};

let products = {
	1: {
		productId: "1",
		name: "quinto andar",
		catchline: "supercool 1",
		description: "descrição 1",
		userId: "1"
	},
	2: {
		productId: "2",
		name: "conta azul",
		catchline: "supercool 2",
		description: "descrição 2",
		userId: "1"
	},
	3: {
		productId: "3",
		name: "produto da stella",
		catchline: "stella is cool",
		description: "stella description",
		userId: "2"
	}
};

let comments = {
	1: {
		text: "Esse produto é bão",
		productId: "1"
	},
	2: {
		text: "Esse aqui é marromenos",
		productId: "2"
	},
	3: {
		text: "Também achei esse produto muito bom",
		productId: "1"
	}
};

export default {
	users,
	products,
	comments
};
