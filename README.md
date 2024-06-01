# ETH-hackathon

## About the project 

The used car market is a vital sector, but it can be fraught with uncertainty for buyers. Traditional methods of tracking a car's history often rely on paper trails and dealer records, leaving room for manipulation and odometer fraud. This can lead to significant financial losses and safety concerns for unsuspecting buyers.

We are introducing VHistory, a revolutionary blockchain-based solution that brings transparency and trust to the used car market. Our innovative approach leverages the power of blockchain technology to create a tamper-proof, verifiable record of a car's mileage, service history, accident data, etc.

## Deployment and testing

Everything that this project holds is simple to deploy and test on your local machine. 
To check functions and requirements for deployment and testing you can read through README files in both contracts and frontend directories.

## Links 

The live version of the app can be found on this [link](https://vhistory.pages.dev/).

The flow of data and storage structures are shown in the diagram on this [link](https://drive.google.com/file/d/12gpOB8Zr1D4B_OGHyqTbTLjXetZZ3RTL/view).

Also, on this [link](https://drive.google.com/file/d/1fH-4iTwa_dTt_vCe49_kZBu5WvPZXHW-/view) you can find the flow of things, how everything is done, and who writes what to the state.

## Future path

For ownership verification, we currently employ a basic hashing function that combines the VIN and the owner's address. This hashed value is stored in the state and used to verify the legitimacy of ownership claims.

If it were not for the time limitation on the hackathon, we would integrate zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) to significantly enhance privacy and verifiability in our ownership verification process. zk-SNARKs would enable zero-knowledge proofs, where ownership can be verified without revealing the actual owner's address. Additionally, zk-SNARKs will allow anyone to verify the proof of ownership at any time, fostering a more transparent and auditable system.
Therefore, in the future, we will integrate zk-SNARK for more advanced and more secure way of proving ownership.

## Team Members

[Cvijan Djukanovic](https://github.com/CvijanCBS)

[Rastko Misulic](https://github.com/RastkoCBS)