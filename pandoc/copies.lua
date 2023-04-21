function Meta(meta)
	if meta.copies then
		n = meta.copies[1]
		m = tostring(n)
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
	end
	return meta
  end