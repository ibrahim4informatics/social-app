export function timeFormatter(ms) {
    if ((ms / 1000) < 60) {
        return `just now`
    }

    else if ((ms / 1000) < 3600) {
        return ` ${Math.floor((ms /( 1000 * 60)))}m`;
    }

    else if ((ms / 1000) < (3600 * 24)) {
        return ` ${Math.floor((ms / (1000 * 3600)))}h`
    }
    else {
        return ` ${Math.floor(ms / (1000 * 3600 * 24))}d`
    }
}

