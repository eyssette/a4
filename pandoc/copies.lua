function Meta(meta)
	if meta.copies then
		if type(meta.copies) == "table" then
			local n = meta.copies[1]
			local m = tostring(n)
			for i=1, 30 do
				if string.find(m,tostring(i)) then
					j=i
				end
			end
			local a = {}
			for i=1, j do
				a[i] = i
			end
			meta.copies = a
		elseif type(meta.copies) == "number" then
			local n = meta.copies
			local a = {}
			for i = 1, n do
			a[i] = i
			end
			meta.copies = a
		else
			meta.copies = nil
		end
		return meta
	end
end