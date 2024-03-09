package utils

import "database/sql"

// string
func OptinalString(ss ...string) string {
	var result string
	if len(ss) > 0 {
		for _, v := range ss {
			result += v
		}
	}
	return result
}

// database value
func NewNullString(s string) sql.NullString {
	if len(s) == 0 {
		return sql.NullString{}
	}
	return sql.NullString{
		String: s,
		Valid:  true,
	}
}

func NormalizeNullString(sn sql.NullString) string {
	if sn.Valid {
		return sn.String
	}
	return ""
}
