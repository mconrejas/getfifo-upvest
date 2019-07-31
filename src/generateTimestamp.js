const MILLISECOND = 0.001

function generateTimestamp() {
    // Assemble timestamp string.
    const timestamp = `${Math.floor(Date.now() * MILLISECOND)}`;

    // Return the timestamp.
    return timestamp
}

// Expose the `generateTimestamp` function.
exports.generateTimestamp = generateTimestamp;