const db = require('../db/dbConfig.js');

const getTransactionsByUserId = async (currentUserId) => {
    try {
        const userTransactions = await db.any("SELECT * FROM transactions WHERE current_user_id = $1", currentUserId);
        return userTransactions;
    } catch (error) {
        return error;
    }
};

const getTransactionById = async (id) => {
    try {
        const transaction = await db.one("SELECT * FROM transactions WHERE id = $1", id);
        return transaction;
    } catch (error) {
        return error;
    }
};

const addTransaction = async (transaction) => {
    try {
        const newTransaction = await db.one(
            "INSERT INTO transactions (current_user_id, transaction_date, transaction_name, transaction_type, transaction_amount, Transaction_vendor) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [transaction.current_user_id, transaction.transaction_date, transaction.transaction_name, transaction.transaction_type, transaction.transaction_amount, transaction.transaction_vendor]
        );
        return newTransaction;
    } catch (error) {
        return error;
    }
};

module.exports = {
    getTransactionsByUserId,
    getTransactionById,
    addTransaction
};