import { Resend } from "resend"; // Importing the Resend module to handle email sending

const resend = new Resend(process.env.RAHI_EMAIL_SERVICE_RESEND_API_KEY); // Initializing Resend with the API key from environment variables

/**
 * Sends an invitation email for an expense to a specified user.
 * 
 * @param {string} email - The email address of the recipient.
 * @param {string} name - The name of the recipient.
 * @param {string} splitter_name - The name of the user who is sending the invitation.
 * @param {string} expenseName - The name of the expense to which the recipient is invited.
 * @returns {Promise<void>} A promise that resolves when the email is sent.
 * @throws {Error} If there is an error during the email sending process.
 */
export const sendInvitationEmailForExpense = async (email, name, splitter_name, expenseName) => {
    try {
        // Sending the email using Resend's email service
        const response = await resend.emails.send({
            from: "noreply@rahiapp.tech", // Sender's email address
            to: email, // Recipient's email address
            subject: `Invitation from ${splitter_name} to contribute to the expense: ${expenseName}`, // Email subject
            html: `
                <html>
                <head>
                    <style>
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        @keyframes slideIn {
                            from { transform: translateY(-20px); opacity: 0; }
                            to { transform: translateY(0); opacity: 1; }
                        }
                        .container { font-family: 'Arial', sans-serif; color: #333; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 30px; border-radius: 10px; box-shadow: 0 0 15px rgba(0,0,0,0.2); animation: fadeIn 1s ease-out; }
                        .header { background-color: #FFA500; color: white; padding: 25px; border-radius: 10px 10px 0 0; text-align: center; }
                        .content { background-color: white; padding: 25px; border-radius: 0 0 10px 10px; }
                        h1 { margin: 0; font-size: 32px; animation: slideIn 1s ease-out; }
                        .emoji { font-size: 50px; margin: 10px 0; }
                        .highlight { color: #FFA500; font-weight: bold; font-size: 26px; }
                        .button { display: inline-block; background-color: #FFA500; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-top: 20px; transition: background-color 0.3s; font-size: 18px; }
                        .button:hover { background-color: #FF8C00; }
                        .footer { margin-top: 20px; text-align: center; font-size: 14px; color: #888; }
                        .doodle { max-width: 150px; margin: 15px auto; display: block; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>You're Invited, ${name}! 🎉</h1> <!-- Invitation header -->
                        </div>
                        <div class="content">
                            <p class="emoji">🌟</p> <!-- Emoji for excitement -->
                            <p>We are thrilled to invite you to contribute to the expense:</p>
                            <p class="highlight" style="text-align: center;">${expenseName}</p> <!-- Highlighted expense name -->
                            <p>Your friend <span class="highlight">${splitter_name}</span> has added you to this shared expense.</p> <!-- Informing who sent the invite -->
                            <img src="https://img.freepik.com/free-vector/social-media-doodle-vector-online-users-concept_53876-126580.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722384000&semt=ais_hybrid" alt="Friends sharing" class="doodle"> <!-- Image related to sharing -->
                            <p>Ready to join the fun? It's easy!</p>
                            <p style="text-align: center;">
                                <a href="https://rahiapp.tech/signup" class="button">Sign Up Now</a> <!-- Call to action button -->
                            </p>
                            <p>Your participation makes a huge difference in making this expense-sharing experience smooth and enjoyable for everyone involved on our travel platform.</p>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtgc9SLjFiPrxLYYC562SfY-FTxhqyxh6Bng&s" alt="Celebration" class="doodle"> <!-- Celebration image -->
                            <p>Thank you for being a valued member of our community. We can't wait to see you on board!</p>
                            <p>Best wishes,</p>
                            <p><strong>The Rahi Team</strong> 🧡</p> <!-- Closing message -->
                        </div>
                        <div class="footer">
                            <p>© 2023 Rahi App. All rights reserved.</p> <!-- Footer information -->
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        console.log(response); // Log the response from the email service
    } catch (error) {
        console.error(error); // Log any errors that occur during the email sending process
    }
};