import "dotenv/config";
import Hashids from "hashids";

const salt = process.env['HASHID_SALT'] || "missing_hashid_salt";
const length = parseInt(process.env['HASHID_LENGTH'] || "10");
const hashids = new Hashids(salt, length, 'abcdefghijklmnopqrstuvwxyz1234567890');
const encoder = new TextEncoder();

export function encodeId(id: number, tag: string) {
    let binary: number[] = [...encoder.encode(tag)];

    return hashids.encode(id, ...binary);
}

export function decodeId(encoded: string) {
    return hashids.decode(encoded)[0];
}