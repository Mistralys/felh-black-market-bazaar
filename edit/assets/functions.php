<?php 

namespace FELH;

function t()
{
    return call_user_func_array('\AppLocalize\t', func_get_args());
}

function pt()
{
    return call_user_func_array('\AppLocalize\pt', func_get_args());
}